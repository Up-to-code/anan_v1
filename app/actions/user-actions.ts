'use server'

import prisma from '@/lib/prisma'
import type { Prisma, User } from '@prisma/client'

export async function listUsers(params: { where?: Prisma.UserWhereInput; orderBy?: Prisma.UserOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, orderBy, skip, take }),
      prisma.user.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listUsers error:', error)
    return { error: 'Failed to list users' }
  }
}

export async function getUserById(id: string) {
  try {
    const item = await prisma.user.findUnique({ where: { id } })
    if (!item) return { error: 'User not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getUserById error:', error)
    return { error: 'Failed to get user' }
  }
}

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const item = await prisma.user.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createUser error:', error)
    return { error: 'Failed to create user' }
  }
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  try {
    const item = await prisma.user.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateUser error:', error)
    return { error: 'Failed to update user' }
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteUser error:', error)
    return { error: 'Failed to delete user' }
  }
}
