'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listCostRecords(params: { where?: Prisma.CostRecordWhereInput; orderBy?: Prisma.CostRecordOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.costRecord.findMany({ where, orderBy, skip, take }),
      prisma.costRecord.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listCostRecords error:', error)
    return { error: 'Failed to list cost records' }
  }
}

export async function getCostRecordById(id: string) {
  try {
    const item = await prisma.costRecord.findUnique({ where: { id } })
    if (!item) return { error: 'Cost record not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getCostRecordById error:', error)
    return { error: 'Failed to get cost record' }
  }
}

export async function createCostRecord(data: Prisma.CostRecordCreateInput) {
  try {
    const item = await prisma.costRecord.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createCostRecord error:', error)
    return { error: 'Failed to create cost record' }
  }
}

export async function updateCostRecord(id: string, data: Prisma.CostRecordUpdateInput) {
  try {
    const item = await prisma.costRecord.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateCostRecord error:', error)
    return { error: 'Failed to update cost record' }
  }
}

export async function deleteCostRecord(id: string) {
  try {
    await prisma.costRecord.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteCostRecord error:', error)
    return { error: 'Failed to delete cost record' }
  }
}
