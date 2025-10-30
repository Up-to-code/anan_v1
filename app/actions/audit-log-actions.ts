'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listAuditLogs(params: { where?: Prisma.AuditLogWhereInput; orderBy?: Prisma.AuditLogOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({ where, orderBy, skip, take }),
      prisma.auditLog.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listAuditLogs error:', error)
    return { error: 'Failed to list audit logs' }
  }
}

export async function getAuditLogById(id: string) {
  try {
    const item = await prisma.auditLog.findUnique({ where: { id } })
    if (!item) return { error: 'Audit log not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getAuditLogById error:', error)
    return { error: 'Failed to get audit log' }
  }
}

export async function createAuditLog(data: Prisma.AuditLogCreateInput) {
  try {
    const item = await prisma.auditLog.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createAuditLog error:', error)
    return { error: 'Failed to create audit log' }
  }
}

export async function updateAuditLog(id: string, data: Prisma.AuditLogUpdateInput) {
  try {
    const item = await prisma.auditLog.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateAuditLog error:', error)
    return { error: 'Failed to update audit log' }
  }
}

export async function deleteAuditLog(id: string) {
  try {
    await prisma.auditLog.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteAuditLog error:', error)
    return { error: 'Failed to delete audit log' }
  }
}
