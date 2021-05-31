import { Event, Team, EventScore } from '@prisma/client'

export type EventWithTeams = (Event & { teams: Team[] })
export type EventWithTeamsAndScores = (Event & { teams: Team[], scores: EventScore[] })