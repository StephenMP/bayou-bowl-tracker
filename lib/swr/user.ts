import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { Team, User } from "../../types/prisma"
import { routes } from "../../util/routes"


export function useUser(userId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<User>(routes.api.user.userId(userId), fetcher, options)

    return {
        user: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useCurrentUser(options?: SWRConfiguration) {
    const { data, error } = useSWR<User>(routes.api.user.index, fetcher, options)

    return {
        user: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useCurrentUserTeams(options?: SWRConfiguration) {
    const { data, error } = useSWR<Team[]>(routes.api.user.teams, fetcher, options)

    return {
        teams: data,
        error: error,
        isLoading: !error && !data,
    }
}