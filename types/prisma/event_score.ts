import { Event, EventScore as PEventScore, PlayerScore, Team, TeamScore } from '@prisma/client'

export type EventScore = (
    PEventScore & {
        event?: Event,
        team?: Team,
        team_score?: TeamScore,
        player_scores?: PlayerScore[]
    }
)