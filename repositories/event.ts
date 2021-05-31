import { Event } from '@prisma/client'
import prisma from '../lib/prisma'
import { EventWithTeams, EventWithTeamsAndScores } from '../types/event'

const client = () => prisma.event

export type EventReadOpts = {
    include: {
        teams?: boolean,
        scores?: boolean
    }
}

type ReturnEvent = Event | EventWithTeams | EventWithTeamsAndScores

const DefaultReadOpts: EventReadOpts = {
    include: {
        teams: false,
        scores: false
    }
}

export async function readEvents(opts: EventReadOpts = DefaultReadOpts): Promise<Array<ReturnEvent>> {
    return await client().findMany({
        include: opts.include
    })
}

export async function readEvent(id: string, opts: EventReadOpts = DefaultReadOpts): Promise<ReturnEvent> {
    return await client().findUnique({
        where: { id },
        include: opts.include
    })
}

export async function readUserEvents(userId: string, opts: EventReadOpts = DefaultReadOpts): Promise<Array<ReturnEvent>> {
    return await client().findMany({
        where: { teams: { every: { team_members: { some: { user_id: userId } } } } },
        include: opts.include
    })
}
