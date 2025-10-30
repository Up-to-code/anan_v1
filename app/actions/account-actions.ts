'use server'

import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function listAccounts(params: { where?: Prisma.AccountWhereInput; orderBy?: Prisma.AccountOrderByWithRelationInput; skip?: number; take?: number } = {}) {
  try {
    const { where, orderBy, skip = 0, take = 20 } = params
    const [items, total] = await Promise.all([
      prisma.account.findMany({ where, orderBy, skip, take }),
      prisma.account.count({ where })
    ])
    return { data: { items, total } }
  } catch (error: unknown) {
    console.error('listAccounts error:', error)
    return { error: 'Failed to list accounts' }
  }
}

export async function getAccountById(id: string) {
  try {
    const item = await prisma.account.findUnique({ where: { id } })
    if (!item) return { error: 'Account not found' }
    return { data: item }
  } catch (error: unknown) {
    console.error('getAccountById error:', error)
    return { error: 'Failed to get account' }
  }
}

export async function createAccount(data: Prisma.AccountCreateInput) {
  try {
    const item = await prisma.account.create({ data })
    return { data: item }
  } catch (error: unknown) {
    console.error('createAccount error:', error)
    return { error: 'Failed to create account' }
  }
}

export async function updateAccount(id: string, data: Prisma.AccountUpdateInput) {
  try {
    const item = await prisma.account.update({ where: { id }, data })
    return { data: item }
  } catch (error: unknown) {
    console.error('updateAccount error:', error)
    return { error: 'Failed to update account' }
  }
}

export async function deleteAccount(id: string) {
  try {
    await prisma.account.delete({ where: { id } })
    return { success: true }
  } catch (error: unknown) {
    console.error('deleteAccount error:', error)
    return { error: 'Failed to delete account' }
  }
}
