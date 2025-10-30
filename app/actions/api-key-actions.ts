'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listApiKeys(params: { where?: Prisma.ApiKeyWhereInput; orderBy?: Prisma.ApiKeyOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.apiKey.findMany({ where, orderBy, skip, take }),
      prisma.apiKey.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listApiKeys error:', error)
    return { error: 'Failed to list API keys' }
  }
}

export async function getApiKeyById(id: string) {
  try {
    const item = await prisma.apiKey.findUnique({ where: { id } })
    if (!item) return { error: 'API key not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getApiKeyById error:', error)
    return { error: 'Failed to get API key' }
  }
}

export async function createApiKey(data: Prisma.ApiKeyCreateInput) {
  try {
    const item = await prisma.apiKey.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createApiKey error:', error)
    return { error: 'Failed to create API key' }
  }
}

export async function updateApiKey(id: string, data: Prisma.ApiKeyUpdateInput) {
  try {
    const item = await prisma.apiKey.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateApiKey error:', error)
    return { error: 'Failed to update API key' }
  }
}

export async function deleteApiKey(id: string) {
  try {
    await prisma.apiKey.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteApiKey error:', error)
    return { error: 'Failed to delete API key' }
  }
}
