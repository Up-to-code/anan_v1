'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listSessions(params: { where?: Prisma.SessionWhereInput; orderBy?: Prisma.SessionOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.session.findMany({ where, orderBy, skip, take }),
      prisma.session.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listSessions error:', error)
    return { error: 'Failed to list sessions' }
  }
}

export async function getSessionById(id: string) {
  try {
    const item = await prisma.session.findUnique({ where: { id } })
    if (!item) return { error: 'Session not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getSessionById error:', error)
    return { error: 'Failed to get session' }
  }
}

export async function createSession(data: Prisma.SessionCreateInput) {
  try {
    const item = await prisma.session.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createSession error:', error)
    return { error: 'Failed to create session' }
  }
}

export async function updateSession(id: string, data: Prisma.SessionUpdateInput) {
  try {
    const item = await prisma.session.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateSession error:', error)
    return { error: 'Failed to update session' }
  }
}

export async function deleteSession(id: string) {
  try {
    await prisma.session.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteSession error:', error)
    return { error: 'Failed to delete session' }
  }
}
