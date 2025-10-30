# Server Actions Documentation

This folder contains server-side actions for all Prisma models. Each action file exports typed CRUD helpers: list, getById, create, update, delete.

## Importing

```ts
// Example: Users
import { listUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/actions/user-actions'

// Example: Projects
import { listProjects, createProject } from '@/app/actions/project-actions'
```

## Usage Examples

```ts
// List with filters and pagination
const { data, error } = await listUsers({
  where: { email: { contains: '@example.com' } },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 20
})
if (error) throw new Error(error)
console.log(data?.items, data?.total)
```

```ts
// Get by ID
const { data, error } = await getUserById(userId)
if (error) throw new Error(error)
```

```ts
// Create
import type { Prisma } from '@prisma/client'
const input: Prisma.UserCreateInput = {
  name: 'Jane Doe',
  email: 'jane@example.com',
}
const { data, error } = await createUser(input)
```

```ts
// Update
import type { Prisma } from '@prisma/client'
const patch: Prisma.UserUpdateInput = {
  name: 'Jane D.'
}
const { data, error } = await updateUser(userId, patch)
```

```ts
// Delete
const { success, error } = await deleteUser(userId)
```

## Pattern (applies to all models)

- Users: `user-actions.ts`
- Sessions: `session-actions.ts`
- Accounts: `account-actions.ts`
- Verifications: `verification-actions.ts`
- Organizations: `organization-actions.ts`
- Organization Members: `organization-member-actions.ts`
- Projects: `project-actions.ts`
- API Keys: `api-key-actions.ts`
- AI Models: `ai-model-actions.ts`
- Usage Metrics: `usage-metric-actions.ts`
- Cost Records: `cost-record-actions.ts`
- Platform Performance: `platform-performance-actions.ts`
- Client Activity: `client-activity-actions.ts`
- Insights: `insight-actions.ts`
- Search History: `search-history-actions.ts`

Each file provides the same function set: `listX`, `getXById`, `createX`, `updateX`, `deleteX`.

## Error Handling

- All actions return `{ data?: T, error?: string }` (or `{ success: boolean }` for deletes).
- Check `error` before using `data`.

## Typing

- Creation/updates accept `Prisma.<Model>CreateInput` and `Prisma.<Model>UpdateInput`.
- Filters accept `Prisma.<Model>WhereInput` and ordering `Prisma.<Model>OrderByWithRelationInput`.

## Server-only

- These actions use `'use server'` and should be called from server components, server actions, or API routes.

