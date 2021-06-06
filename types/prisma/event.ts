import { Event as PEvent, EventScore, Team } from '@prisma/client'

export type Event = (
    PEvent & {
        teams?: Team[],
        scores?: EventScore[]
    }
)