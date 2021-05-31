import { Event, Team, EventScore, TeamMember } from '@prisma/client'

export type UserWithProfile = (User & { profile: UserProfile })