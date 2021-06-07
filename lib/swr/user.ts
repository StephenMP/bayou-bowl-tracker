import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { User } from "../../types/prisma"


export function useUser(userId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<User>(`/api/user/${userId}`, fetcher, options)

    return {
        user: data,
        error: error,
        isLoading: !error && !data,
    }
}
