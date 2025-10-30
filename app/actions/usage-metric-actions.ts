'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listUsageMetrics(params: { where?: Prisma.UsageMetricWhereInput; orderBy?: Prisma.UsageMetricOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.usageMetric.findMany({ where, orderBy, skip, take }),
      prisma.usageMetric.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listUsageMetrics error:', error)
    return { error: 'Failed to list usage metrics' }
  }
}

export async function getUsageMetricById(id: string) {
  try {
    const item = await prisma.usageMetric.findUnique({ where: { id } })
    if (!item) return { error: 'Usage metric not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getUsageMetricById error:', error)
    return { error: 'Failed to get usage metric' }
  }
}

export async function createUsageMetric(data: Prisma.UsageMetricCreateInput) {
  try {
    const item = await prisma.usageMetric.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createUsageMetric error:', error)
    return { error: 'Failed to create usage metric' }
  }
}

export async function updateUsageMetric(id: string, data: Prisma.UsageMetricUpdateInput) {
  try {
    const item = await prisma.usageMetric.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateUsageMetric error:', error)
    return { error: 'Failed to update usage metric' }
  }
}

export async function deleteUsageMetric(id: string) {
  try {
    await prisma.usageMetric.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteUsageMetric error:', error)
    return { error: 'Failed to delete usage metric' }
  }
}
