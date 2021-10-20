import { prisma } from '../lib/prisma'
import { Event } from '../types/prisma'

const client = () => prisma.event

export type EventReadOpts = {
    include: {
        teams?: boolean,
        scores?: boolean
    }
}

const DefaultReadOpts: EventReadOpts = {
    include: {
        teams: true,
        scores: true
    }
}

export async function readEvents(opts: EventReadOpts = DefaultReadOpts): Promise<Array<Event>> {
    return await client().findMany({
        include: opts.include
    })
}

export async function readEvent(id: string, opts: EventReadOpts = DefaultReadOpts): Promise<Event> {
    return await client().findUnique({
        where: { id },
        include: opts.include
    })
}

export async function readUserEvents(userId: string, opts: EventReadOpts = DefaultReadOpts): Promise<Array<Event>> {
    return await client().findMany({
        where:
        {
            teams: {
                every: {
                    team_members: {
                        some: { user_id: userId }
                    }
                }
            }
        },
        include: opts.include
    })
}
