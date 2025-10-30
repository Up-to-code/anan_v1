'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listAiModels(params: { where?: Prisma.AiModelWhereInput; orderBy?: Prisma.AiModelOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.aiModel.findMany({ where, orderBy, skip, take }),
      prisma.aiModel.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listAiModels error:', error)
    return { error: 'Failed to list AI models' }
  }
}

export async function getAiModelById(id: string) {
  try {
    const item = await prisma.aiModel.findUnique({ where: { id } })
    if (!item) return { error: 'AI Model not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getAiModelById error:', error)
    return { error: 'Failed to get AI model' }
  }
}

export async function createAiModel(data: Prisma.AiModelCreateInput) {
  try {
    const item = await prisma.aiModel.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createAiModel error:', error)
    return { error: 'Failed to create AI model' }
  }
}

export async function updateAiModel(id: string, data: Prisma.AiModelUpdateInput) {
  try {
    const item = await prisma.aiModel.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateAiModel error:', error)
    return { error: 'Failed to update AI model' }
  }
}

export async function deleteAiModel(id: string) {
  try {
    await prisma.aiModel.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteAiModel error:', error)
    return { error: 'Failed to delete AI model' }
  }
}
