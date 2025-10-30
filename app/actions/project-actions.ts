'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listProjects(params: { where?: Prisma.ProjectWhereInput; orderBy?: Prisma.ProjectOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.project.findMany({ where, orderBy, skip, take }),
      prisma.project.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listProjects error:', error)
    return { error: 'Failed to list projects' }
  }
}

export async function getProjectById(id: string) {
  try {
    const item = await prisma.project.findUnique({ where: { id } })
    if (!item) return { error: 'Project not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getProjectById error:', error)
    return { error: 'Failed to get project' }
  }
}

export async function createProject(data: Prisma.ProjectCreateInput) {
  try {
    const item = await prisma.project.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createProject error:', error)
    return { error: 'Failed to create project' }
  }
}

export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  try {
    const item = await prisma.project.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateProject error:', error)
    return { error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteProject error:', error)
    return { error: 'Failed to delete project' }
  }
}
