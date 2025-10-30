'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listPlatformPerformance(params: { where?: Prisma.PlatformPerformanceWhereInput; orderBy?: Prisma.PlatformPerformanceOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.platformPerformance.findMany({ where, orderBy, skip, take }),
      prisma.platformPerformance.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listPlatformPerformance error:', error)
    return { error: 'Failed to list platform performance' }
  }
}

export async function getPlatformPerformanceById(id: string) {
  try {
    const item = await prisma.platformPerformance.findUnique({ where: { id } })
    if (!item) return { error: 'Platform performance not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getPlatformPerformanceById error:', error)
    return { error: 'Failed to get platform performance' }
  }
}

export async function createPlatformPerformance(data: Prisma.PlatformPerformanceCreateInput) {
  try {
    const item = await prisma.platformPerformance.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createPlatformPerformance error:', error)
    return { error: 'Failed to create platform performance' }
  }
}

export async function updatePlatformPerformance(id: string, data: Prisma.PlatformPerformanceUpdateInput) {
  try {
    const item = await prisma.platformPerformance.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updatePlatformPerformance error:', error)
    return { error: 'Failed to update platform performance' }
  }
}

export async function deletePlatformPerformance(id: string) {
  try {
    await prisma.platformPerformance.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deletePlatformPerformance error:', error)
    return { error: 'Failed to delete platform performance' }
  }
}
