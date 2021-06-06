import { PlayerScore, User as PUser, UserProfile } from '@prisma/client'

export type User = (
    PUser &
    {
        profile?: UserProfile,
        player_scores?: PlayerScore[]
    })