import { prisma } from '../lib/prisma'
import { EventScore } from '../types/prisma'

const client = () => prisma.eventScore

export type EventScoreReadOpts = {
    include: {
        player_scores: boolean,
        team_score: boolean,
        team: boolean,
        event: boolean
    }
}

const DefaultReadOpts: EventScoreReadOpts = {
    include: {
        player_scores: true,
        team_score: true,
        team: true,
        event: true
    }
}

export type EventScorePartialId = {
    event_id: string,
    round_num: number,
    team_id: string
}

export type EventScoreId = EventScorePartialId & {
    user_id: string
}

export async function createEventScore(eventScore: EventScore): Promise<void> {
    try {
        await client().create({
            data: {
                round_num: eventScore.round_num,
                team_id: eventScore.team_id,
                event_id: eventScore.event_id,
                player_scores: {
                    createMany: {
                        data: eventScore.player_scores.map(ps => ({
                            kills: ps.kills,
                            user_id: ps.user_id
                        }))
                    }
                },
                team_score: {
                    create: {
                        bounties: eventScore.team_score.bounties
                    }
                }
            }
        })
    }
    catch (e) {
        console.log("ERROR: ", e.message)
        throw e
    }
}

export async function deleteEventScore(eventId: string, teamId: string, roundNum: number): Promise<void> {
    try {
        const deletePlayerScoresPromise = prisma.playerScore.deleteMany({
            where: {
                event_id: eventId,
                team_id: teamId,
                round_num: roundNum
            }
        })

        const deleteTeamScorePromise = prisma.teamScore.delete({
            where: {
                event_id_team_id_round_num: {
                    event_id: eventId,
                    team_id: teamId,
                    round_num: roundNum
                }
            }
        })

        await Promise.all([deletePlayerScoresPromise, deleteTeamScorePromise])

        await client().delete({
            where: {
                event_id_team_id_round_num: {
                    event_id: eventId,
                    team_id: teamId,
                    round_num: roundNum
                }
            }
        })
    }

    catch (e) {
        console.log("ERROR: ", e.message)
    }
}

export async function readEventScoresForTeam(teamId: string, opts: EventScoreReadOpts = DefaultReadOpts): Promise<EventScore[]> {
    return await client().findMany({
        where: {
            team_id: teamId
        },
        include: opts.include
    })
}

export async function readEventScoresForEvent(eventId: string, opts: EventScoreReadOpts = DefaultReadOpts): Promise<EventScore[]> {
    return await client().findMany({
        where: {
            event_id: eventId
        },
        include: opts.include
    })
}
