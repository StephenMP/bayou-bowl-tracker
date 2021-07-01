import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { User } from "../../types/prisma"
import { routes } from "../../util/routes"


export function useAllUsers(options?: SWRConfiguration) {
    const { data, error } = useSWR<User[]>(routes.api.admin.users, fetcher, options)

    return {
        users: data,
        error: error,
        isLoading: !error && !data,
    }
}
