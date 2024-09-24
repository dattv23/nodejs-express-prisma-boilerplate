import z from 'zod'
import { Role } from '@prisma/client'

import { passwordSchema } from './custom.validation'

const createUser = {
  body: z.object({
    email: z.string().email(),
    password: passwordSchema,
    name: z.string(),
    role: z.nativeEnum(Role)
  })
} as const

const getUsers = {
  query: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.number().int().positive().optional(),
    page: z.number().int().positive().optional()
  })
} as const

export type TQueryUsers = z.infer<typeof getUsers.query>

const getUser = {
  params: z.object({
    userId: z.number().int().positive()
  })
} as const

const updateUser = {
  params: z.object({
    userId: z.number().int().positive()
  }),
  body: z
    .object({
      email: z.string().email().optional(),
      password: passwordSchema.optional(),
      name: z.string().optional()
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update'
    })
} as const

const deleteUser = {
  params: z.object({
    userId: z.number().int().positive()
  })
} as const

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
