import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { Team } from "../../types/prisma"


export function useUserTeamForEvent(eventId: string, userId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Team>(`/api/event/${eventId}/team/${userId}`, fetcher, options)

    return {
        team: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useTeam(teamId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Team>(`/api/team/${teamId}`, fetcher, options)

    return {
        team: data,
        error: error,
        isLoading: !error && !data,
    }
}