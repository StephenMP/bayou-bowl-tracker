import { User, UserProfile as PUserProfile } from '@prisma/client'

export type UserProfile = (
    PUserProfile & {
        user?: User
    }
)