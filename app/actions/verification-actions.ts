'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listVerifications(params: { where?: Prisma.VerificationWhereInput; orderBy?: Prisma.VerificationOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.verification.findMany({ where, orderBy, skip, take }),
      prisma.verification.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listVerifications error:', error)
    return { error: 'Failed to list verifications' }
  }
}

export async function getVerificationById(id: string) {
  try {
    const item = await prisma.verification.findUnique({ where: { id } })
    if (!item) return { error: 'Verification not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getVerificationById error:', error)
    return { error: 'Failed to get verification' }
  }
}

export async function createVerification(data: Prisma.VerificationCreateInput) {
  try {
    const item = await prisma.verification.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createVerification error:', error)
    return { error: 'Failed to create verification' }
  }
}

export async function updateVerification(id: string, data: Prisma.VerificationUpdateInput) {
  try {
    const item = await prisma.verification.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateVerification error:', error)
    return { error: 'Failed to update verification' }
  }
}

export async function deleteVerification(id: string) {
  try {
    await prisma.verification.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteVerification error:', error)
    return { error: 'Failed to delete verification' }
  }
}
