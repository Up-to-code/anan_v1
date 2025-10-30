'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listOrganizationMembers(params: { where?: Prisma.OrganizationMemberWhereInput; orderBy?: Prisma.OrganizationMemberOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.organizationMember.findMany({ where, orderBy, skip, take }),
      prisma.organizationMember.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listOrganizationMembers error:', error)
    return { error: 'Failed to list organization members' }
  }
}

export async function getOrganizationMemberById(id: string) {
  try {
    const item = await prisma.organizationMember.findUnique({ where: { id } })
    if (!item) return { error: 'Organization member not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getOrganizationMemberById error:', error)
    return { error: 'Failed to get organization member' }
  }
}

export async function createOrganizationMember(data: Prisma.OrganizationMemberCreateInput) {
  try {
    const item = await prisma.organizationMember.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createOrganizationMember error:', error)
    return { error: 'Failed to create organization member' }
  }
}

export async function updateOrganizationMember(id: string, data: Prisma.OrganizationMemberUpdateInput) {
  try {
    const item = await prisma.organizationMember.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateOrganizationMember error:', error)
    return { error: 'Failed to update organization member' }
  }
}

export async function deleteOrganizationMember(id: string) {
  try {
    await prisma.organizationMember.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteOrganizationMember error:', error)
    return { error: 'Failed to delete organization member' }
  }
}
