import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { Team } from "../../types/prisma"
import { routes } from "../../util/routes"


export function useUserTeamForEvent(eventId: string, userId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Team>(routes.api.event.eventId.team.userId(eventId, userId), fetcher, options)

    return {
        team: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useTeam(teamId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Team>(routes.api.team.teamId(teamId), fetcher, options)

    return {
        team: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useTeamsForEvent(eventId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Team[]>(routes.api.teams.eventId(eventId), fetcher, options)

    return {
        teams: data,
        error: error,
        isLoading: !error && !data,
    }
}