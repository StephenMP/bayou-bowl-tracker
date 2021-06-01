import { User, UserProfile } from '@prisma/client'

export type UserWithProfile = (User & { profile: UserProfile })