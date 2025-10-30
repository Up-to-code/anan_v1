'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listInsights(params: { where?: Prisma.InsightWhereInput; orderBy?: Prisma.InsightOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.insight.findMany({ where, orderBy, skip, take }),
      prisma.insight.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listInsights error:', error)
    return { error: 'Failed to list insights' }
  }
}

export async function getInsightById(id: string) {
  try {
    const item = await prisma.insight.findUnique({ where: { id } })
    if (!item) return { error: 'Insight not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getInsightById error:', error)
    return { error: 'Failed to get insight' }
  }
}

export async function createInsight(data: Prisma.InsightCreateInput) {
  try {
    const item = await prisma.insight.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createInsight error:', error)
    return { error: 'Failed to create insight' }
  }
}

export async function updateInsight(id: string, data: Prisma.InsightUpdateInput) {
  try {
    const item = await prisma.insight.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateInsight error:', error)
    return { error: 'Failed to update insight' }
  }
}

export async function deleteInsight(id: string) {
  try {
    await prisma.insight.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteInsight error:', error)
    return { error: 'Failed to delete insight' }
  }
}
