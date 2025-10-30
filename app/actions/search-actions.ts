'use server'

import prisma from '@/lib/prisma'
import { getTimeFilter, calculateRelevance } from '@/lib/actions/utils'
import type { SearchFilters, SearchResult } from '@/lib/actions/types'
import type { Prisma } from '@prisma/client'

/**
 * Performs intelligent search across multiple entity types
 * @param userId - The user performing the search
 * @param query - Search query string
 * @param filters - Optional filters to narrow results
 * @param limit - Maximum number of results to return
 */
export async function smartSearch(
  userId: string,
  query: string,
  filters: SearchFilters = {},
  limit: number = 20
): Promise<{ data?: SearchResult[]; error?: string }> {
  try {
    // Validate inputs
    if (!userId || typeof userId !== 'string' || !query || !query.trim()) {
      return { error: 'Invalid search parameters' }
    }
    const sanitizedQuery = query.trim()
    const safeLimit = Math.min(Math.max(1, limit), 100) // Cap at 100

    // Log the search asynchronously
    const searchLogPromise = prisma.searchHistory.create({
      data: {
        query: sanitizedQuery,
        filters,
        resultCount: 0,
        userId
      }
    }).catch((err: unknown) => {
      // Fails silently but logs for investigation
      console.error('Failed to log search:', err)
    })

    // Search across multiple entities in parallel
    let results: SearchResult[][] | null = null
    try {
      results = await Promise.all([
        searchProjects(sanitizedQuery, filters, safeLimit),
        searchUsageMetrics(sanitizedQuery, filters, safeLimit),
        searchCostRecords(sanitizedQuery, filters, safeLimit),
        searchUsers(sanitizedQuery, filters, safeLimit),
        searchOrganizations(sanitizedQuery, filters, safeLimit)
      ])
    } catch (err) {
      console.error('Error executing parallel search:', err)
      return { error: 'Search failed (parallel query error)' }
    }

    const [
      projectResults = [],
      usageResults = [],
      costResults = [],
      userResults = [],
      organizationResults = []
    ] = results || []

    const allResults = [
      ...projectResults,
      ...usageResults,
      ...costResults,
      ...userResults,
      ...organizationResults
    ]

    // Sort by relevance, highest first, then slice to safeLimit
    const sortedResults = allResults
      .filter(r => typeof r.relevance === 'number' && !isNaN(r.relevance))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, safeLimit)

    // Update search log with result count
    try {
      await searchLogPromise
      await prisma.searchHistory.updateMany({
        where: {
          userId,
          query: sanitizedQuery,
          createdAt: {
            gte: new Date(Date.now() - 5000) // 5 seconds window
          }
        },
        data: {
          resultCount: sortedResults.length
        }
      })
    } catch (err) {
      console.error('Failed to update search history:', err)
    }

    return { data: sortedResults }
  } catch (error: unknown) {
    console.error('Error in smartSearch:', error)
    return {
      error: error instanceof Error ? error.message : 'Search failed'
    }
  }
}

async function searchProjects(
  query: string,
  filters: SearchFilters,
  limit: number
): Promise<SearchResult[]> {
  try {
    const whereConditions: Prisma.ProjectWhereInput[] = [
      {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      }
    ]
    if (filters.projectId) whereConditions.push({ id: filters.projectId })
    if (filters.organizationId) whereConditions.push({ organizationId: filters.organizationId })
    // Defensive: skip impossible queries
    if (filters.projectId && typeof filters.projectId !== 'string') return []

    const projects = await prisma.project.findMany({
      where: {
        AND: whereConditions
      },
      include: {
        organization: { select: { name: true } },
        _count: {
          select: {
            usageMetrics: true,
            costRecords: true
          }
        }
      },
      take: limit
    })

    return projects.map(project => ({
      type: 'project' as const,
      id: project.id,
      title: project.name,
      description: `Project in ${project.organization?.name || 'N/A'}`,
      relevance: calculateRelevance(project.name, query),
      metadata: {
        organization: project.organization?.name,
        metricsCount: project._count.usageMetrics,
        costsCount: project._count.costRecords,
        isActive: project.isActive
      }
    }))
  } catch (error) {
    console.error('Error searching projects:', error)
    return []
  }
}

async function searchUsageMetrics(
  query: string,
  filters: SearchFilters,
  limit: number
): Promise<SearchResult[]> {
  try {
    const whereConditions: Prisma.UsageMetricWhereInput[] = [
      {
        OR: [
          { endpoint: { contains: query, mode: 'insensitive' } },
          { model: { name: { contains: query, mode: 'insensitive' } } },
          { project: { name: { contains: query, mode: 'insensitive' } } }
        ]
      }
    ]

    if (filters.projectId) whereConditions.push({ projectId: filters.projectId })
    if (filters.modelId) whereConditions.push({ modelId: filters.modelId })
    if (filters.minCost !== undefined) whereConditions.push({ cost: { gte: filters.minCost } })
    if (filters.maxCost !== undefined) whereConditions.push({ cost: { lte: filters.maxCost } })
    if (filters.minTokens !== undefined) whereConditions.push({ tokenCount: { gte: filters.minTokens } })
    if (filters.maxTokens !== undefined) whereConditions.push({ tokenCount: { lte: filters.maxTokens } })

    const usageMetrics = await prisma.usageMetric.findMany({
      where: {
        AND: whereConditions
      },
      include: {
        project: { select: { name: true } },
        model: { select: { name: true } }
      },
      orderBy: { timestamp: 'desc' },
      take: limit
    })

    return usageMetrics.map(metric => ({
      type: 'usage' as const,
      id: metric.id,
      title: `${metric.model?.name || 'Unknown'} Usage`,
      description: `${metric.tokenCount?.toLocaleString() || '0'} tokens - ${metric.project?.name || 'N/A'}`,
      relevance: calculateRelevance(metric.model?.name || '', query),
      metadata: {
        tokens: metric.tokenCount,
        cost: metric.cost,
        timestamp: metric.timestamp,
        project: metric.project?.name,
        model: metric.model?.name
      }
    }))
  } catch (error) {
    console.error('Error searching usage metrics:', error)
    return []
  }
}

async function searchCostRecords(
  query: string,
  filters: SearchFilters,
  limit: number
): Promise<SearchResult[]> {
  try {
    const whereConditions: Prisma.CostRecordWhereInput[] = [
      {
        OR: [
          { model: { name: { contains: query, mode: 'insensitive' } } },
          { project: { name: { contains: query, mode: 'insensitive' } } }
        ]
      }
    ]

    if (filters.projectId) whereConditions.push({ projectId: filters.projectId })
    if (filters.modelId) whereConditions.push({ modelId: filters.modelId })
    if (filters.minCost !== undefined) whereConditions.push({ totalCost: { gte: filters.minCost } })
    if (filters.maxCost !== undefined) whereConditions.push({ totalCost: { lte: filters.maxCost } })

    const costRecords = await prisma.costRecord.findMany({
      where: {
        AND: whereConditions
      },
      include: {
        project: { select: { name: true } },
        model: { select: { name: true } }
      },
      orderBy: { period: 'desc' },
      take: limit
    })

    return costRecords.map(record => ({
      type: 'cost' as const,
      id: record.id,
      title: `Cost: ${record.model?.name || 'Unknown'}`,
      description: `$${record.totalCost !== undefined && record.totalCost !== null ? record.totalCost.toFixed(2) : '0.00'} - ${record.project?.name || 'N/A'}`,
      relevance: calculateRelevance(record.model?.name || '', query),
      metadata: {
        totalCost: record.totalCost,
        development: record.developmentCost,
        inference: record.inferenceCost,
        maintenance: record.maintenanceCost,
        period: record.period,
        project: record.project?.name
      }
    }))
  } catch (error) {
    console.error('Error searching cost records:', error)
    return []
  }
}

async function searchUsers(
  query: string,
  filters: SearchFilters,
  limit: number
): Promise<SearchResult[]> {
  try {
    type UserWithOrgsAndCount = Prisma.UserGetPayload<{
      include: {
        organizations: {
          include: { organization: { select: { name: true } } }
        }
        _count: { select: { apiKeys: true } }
      }
    }>
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        organizations: {
          include: {
            organization: { select: { name: true } }
          }
        },
        _count: { select: { apiKeys: true } }
      },
      take: limit
    }) as UserWithOrgsAndCount[]

    return users.map(user => ({
      type: 'user' as const,
      id: user.id,
      title: user.name || 'Unnamed User',
      description: user.email,
      relevance: calculateRelevance(`${user.name || ''} ${user.email}`, query),
      metadata: {
        email: user.email,
        role: user.role,
        organizations: (user.organizations || []).map(org => org.organization?.name ?? 'N/A'),
        apiKeysCount: user._count.apiKeys
      }
    }))
  } catch (error) {
    console.error('Error searching users:', error)
    return []
  }
}

async function searchOrganizations(
  query: string,
  filters: SearchFilters,
  limit: number
): Promise<SearchResult[]> {
  try {
    type OrgWithCounts = Prisma.OrganizationGetPayload<{
      include: { _count: { select: { projects: true; members: true } } }
    }>
    const organizations = await prisma.organization.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        _count: { select: { projects: true, members: true } }
      },
      take: limit
    }) as OrgWithCounts[]

    return organizations.map(org => ({
      type: 'organization' as const,
      id: org.id,
      title: org.name,
      description: `${org.plan} plan - ${org._count.projects} project${org._count.projects === 1 ? '' : 's'}`,
      relevance: calculateRelevance(org.name, query),
      metadata: {
        slug: org.slug,
        plan: org.plan,
        projectsCount: org._count.projects,
        membersCount: org._count.members,
        isActive: org.isActive
      }
    }))
  } catch (error) {
    console.error('Error searching organizations:', error)
    return []
  }
}

/**
 * Get search suggestions based on user's search history and popular searches
 */
export async function getSearchSuggestions(
  userId: string,
  partialQuery: string
): Promise<{ data?: string[]; error?: string }> {
  try {
    if (!userId || !partialQuery || !partialQuery.trim()) {
      return { data: [] }
    }

    const sanitizedQuery = partialQuery.trim()

    const [recentSearches, popularSearches] = await Promise.all([
      prisma.searchHistory.findMany({
        where: {
          userId,
          query: {
            startsWith: sanitizedQuery,
            mode: 'insensitive'
          }
        },
        select: {
          query: true
        },
        distinct: ['query'],
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }),
      prisma.searchHistory.groupBy({
        by: ['query'],
        where: {
          query: {
            startsWith: sanitizedQuery,
            mode: 'insensitive'
          },
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        _count: {
          query: true
        },
        orderBy: {
          _count: {
            query: 'desc'
          }
        },
        take: 5
      })
    ])

    // Defensive: recentSearches is array of objects with .query
    // popularSearches is array of groupBy objects { query, _count: { query: n } }
    const recentQueries = Array.isArray(recentSearches)
      ? (recentSearches as Array<{ query: string }>).map((s) => s.query)
      : []
    const popularQueries = Array.isArray(popularSearches)
      ? (popularSearches as Array<{ query: string; _count: { query: number } }>).map((s) => s.query)
      : []

    // Prioritize recent searches, then add popular ones
    const suggestions = [
      ...recentQueries,
      ...popularQueries.filter(q => !recentQueries.includes(q))
    ]

    const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 10)

    return { data: uniqueSuggestions }
  } catch (error: unknown) {
    console.error('Error getting search suggestions:', error)
    return { error: 'Failed to get suggestions' }
  }
}

type SearchAnalyticsData = {
  topSearches: Array<{ query: string; searchCount: number; avgResults: number }>
  stats: { totalSearches: number; avgResultsPerSearch: number }
}

/**
 * Get analytics about user's search behavior
 */
export async function getSearchAnalytics(
  userId: string,
  timeRange: string = '30D'
): Promise<{ data?: SearchAnalyticsData; error?: string }> {
  try {
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      return { error: 'User ID is required' }
    }

    const { startDate, endDate } = getTimeFilter(timeRange)

    const [topSearches, searchStats] = await Promise.all([
      prisma.searchHistory.groupBy({
        by: ['query'],
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        _count: {
          id: true
        },
        _avg: {
          resultCount: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        },
        take: 20
      }),

      prisma.searchHistory.aggregate({
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        _count: {
          id: true
        },
        _avg: {
          resultCount: true
        }
      })
    ])

    return {
      data: {
        topSearches: Array.isArray(topSearches)
          ? (topSearches as Array<{ query: string; _count: { id: number }; _avg: { resultCount: number | null } }>).map((search) => ({
            query: search.query,
            searchCount: search._count.id,
            avgResults: Math.round(typeof search._avg.resultCount === 'number' ? search._avg.resultCount : 0)
          }))
          : [],
        stats: {
          totalSearches: searchStats._count.id,
          avgResultsPerSearch: Math.round(typeof searchStats._avg.resultCount === 'number' ? searchStats._avg.resultCount : 0)
        }
      }
    }
  } catch (error: unknown) {
    console.error('Error getting search analytics:', error)
    return { error: 'Failed to get search analytics' }
  }
}