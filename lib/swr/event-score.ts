import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { EventScore } from "../../types/prisma"
import { routes } from "../../util/routes"

export type EventScoreByTeam = {
    teamName: string,
    teamId: string,
    kills: number,
    bounties: number,
    totalScore: number,
    totalRounds: number
}

export function useEventScoreForEventByTeam(eventId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<EventScoreByTeam[]>(routes.api.leaderboard.eventId(eventId), fetcher, options)

    return {
        eventScoresByTeam: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useEventScoreForTeam(teamId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<EventScore[]>(routes.api.event_scores.team.teamId(teamId), fetcher, options)

    return {
        eventScores: data,
        error: error,
        isLoading: !error && !data,
    }
}