import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { Team, User } from "../../types/prisma"


export function useUser(userId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<User>(`/api/user/${userId}`, fetcher, options)

    return {
        user: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useCurrentUser(options?: SWRConfiguration) {
    const { data, error } = useSWR<User>(`/api/user`, fetcher, options)

    return {
        user: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useCurrentUserTeams(options?: SWRConfiguration) {
    const { data, error } = useSWR<Team[]>(`/api/user/teams`, fetcher, options)

    return {
        teams: data,
        error: error,
        isLoading: !error && !data,
    }
}