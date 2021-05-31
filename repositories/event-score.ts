import { EventScore } from '@prisma/client'
import prisma from '../lib/prisma'

const client = () => prisma.eventScore

export const EVENT_SCORES_CHANNEL = 'event-scores'
export type EventScoreMessage = {
    type: 'create' | 'update' | 'delete',
    eventScore?: EventScore
    compositeId?: EventScoreId
    partialId?: EventScorePartialId
}

export type ReadEventScore = EventScore
export type EventScorePartialId = {
    event_id: string,
    round_num: number,
    team_id: string
}

export type EventScoreId = EventScorePartialId & {
    user_id: string
}

export async function createEventScore(eventScore: EventScore): Promise<void> {
    await client().create({
        data: eventScore
    })
}

export async function updateEventScore(eventScore: EventScore): Promise<void> {
    await client().update({
        where: {
            event_id_team_id_user_id_round_num: {
                event_id: eventScore.event_id,
                round_num: eventScore.round_num,
                team_id: eventScore.team_id,
                user_id: eventScore.user_id
            }
        },
        data: eventScore
    })
}

export async function deleteEventScore(eventId: string, teamId: string, roundNum: number): Promise<void> {
    await client().deleteMany({
        where: {
            event_id: eventId,
            team_id: teamId,
            round_num: roundNum
        }
    })
}

export async function deleteEventScoreForUser(compositeId: EventScoreId): Promise<void> {
    await client().delete({
        where: {
            event_id_team_id_user_id_round_num: compositeId
        }
    })
}

export async function readEventScores(eventId: string): Promise<ReadEventScore[]> {
    return await client().findMany({
        where: {
            event_id: eventId
        }
    })
}

export async function readEventScore(compositeId: EventScoreId): Promise<ReadEventScore> {
    return await client().findUnique({
        where: {
            event_id_team_id_user_id_round_num: compositeId
        }
    })
}
