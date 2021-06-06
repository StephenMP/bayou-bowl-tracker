import { EventScore, TeamScore as PTeamScore } from '@prisma/client'

export type TeamScore = (
    PTeamScore & {
        event_score?: EventScore
    }
)