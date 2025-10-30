'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listClientActivity(params: { where?: Prisma.ClientActivityWhereInput; orderBy?: Prisma.ClientActivityOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.clientActivity.findMany({ where, orderBy, skip, take }),
      prisma.clientActivity.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listClientActivity error:', error)
    return { error: 'Failed to list client activity' }
  }
}

export async function getClientActivityById(id: string) {
  try {
    const item = await prisma.clientActivity.findUnique({ where: { id } })
    if (!item) return { error: 'Client activity not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getClientActivityById error:', error)
    return { error: 'Failed to get client activity' }
  }
}

export async function createClientActivity(data: Prisma.ClientActivityCreateInput) {
  try {
    const item = await prisma.clientActivity.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createClientActivity error:', error)
    return { error: 'Failed to create client activity' }
  }
}

export async function updateClientActivity(id: string, data: Prisma.ClientActivityUpdateInput) {
  try {
    const item = await prisma.clientActivity.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateClientActivity error:', error)
    return { error: 'Failed to update client activity' }
  }
}

export async function deleteClientActivity(id: string) {
  try {
    await prisma.clientActivity.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteClientActivity error:', error)
    return { error: 'Failed to delete client activity' }
  }
}
