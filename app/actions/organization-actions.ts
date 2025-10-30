'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listOrganizations(params: { where?: Prisma.OrganizationWhereInput; orderBy?: Prisma.OrganizationOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.organization.findMany({ where, orderBy, skip, take }),
      prisma.organization.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listOrganizations error:', error)
    return { error: 'Failed to list organizations' }
  }
}

export async function getOrganizationById(id: string) {
  try {
    const item = await prisma.organization.findUnique({ where: { id } })
    if (!item) return { error: 'Organization not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getOrganizationById error:', error)
    return { error: 'Failed to get organization' }
  }
}

export async function createOrganization(data: Prisma.OrganizationCreateInput) {
  try {
    const item = await prisma.organization.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createOrganization error:', error)
    return { error: 'Failed to create organization' }
  }
}

export async function updateOrganization(id: string, data: Prisma.OrganizationUpdateInput) {
  try {
    const item = await prisma.organization.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateOrganization error:', error)
    return { error: 'Failed to update organization' }
  }
}

export async function deleteOrganization(id: string) {
  try {
    await prisma.organization.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteOrganization error:', error)
    return { error: 'Failed to delete organization' }
  }
}
