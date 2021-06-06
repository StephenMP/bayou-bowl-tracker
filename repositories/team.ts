import prisma from '../lib/prisma'
import { Team } from '../types/prisma'

const client = () => prisma.team

export type TeamReadOpts = {
    include: {
        event?: boolean,
        team_members?: boolean
    }
}

const DefaultReadOpts: TeamReadOpts = {
    include: {
        event: true,
        team_members: true
    }
}

export async function readTeams(opts: TeamReadOpts = DefaultReadOpts): Promise<Array<Team>> {
    return await client().findMany({
        include: opts.include
    })
}

export async function readTeamByEventAndUser(eventId: string, userId: string, opts: TeamReadOpts = DefaultReadOpts): Promise<Team> {
    return await prisma.team.findFirst({
        where: {
            AND: [
                {
                    event_id: eventId
                },
                {
                    team_members: {
                        some: {
                            user_id: userId
                        }
                    }
                }
            ]
        },
        include: {
            ...opts.include,
            team_members: true
        }
    })
}