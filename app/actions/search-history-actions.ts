'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listSearchHistory(params: { where?: Prisma.SearchHistoryWhereInput; orderBy?: Prisma.SearchHistoryOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.searchHistory.findMany({ where, orderBy, skip, take }),
      prisma.searchHistory.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listSearchHistory error:', error)
    return { error: 'Failed to list search history' }
  }
}

export async function getSearchHistoryById(id: string) {
  try {
    const item = await prisma.searchHistory.findUnique({ where: { id } })
    if (!item) return { error: 'Search history item not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getSearchHistoryById error:', error)
    return { error: 'Failed to get search history item' }
  }
}

export async function createSearchHistory(data: Prisma.SearchHistoryCreateInput) {
  try {
    const item = await prisma.searchHistory.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createSearchHistory error:', error)
    return { error: 'Failed to create search history' }
  }
}

export async function updateSearchHistory(id: string, data: Prisma.SearchHistoryUpdateInput) {
  try {
    const item = await prisma.searchHistory.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateSearchHistory error:', error)
    return { error: 'Failed to update search history' }
  }
}

export async function deleteSearchHistory(id: string) {
  try {
    await prisma.searchHistory.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteSearchHistory error:', error)
    return { error: 'Failed to delete search history' }
  }
}
