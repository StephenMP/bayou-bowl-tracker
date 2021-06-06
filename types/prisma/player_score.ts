import { EventScore, PlayerScore as PPlayerScore, User } from '@prisma/client'

export type PlayerScore = (
    PPlayerScore & {
        event_score?: EventScore,
        user?: User
    }
)