import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { Event } from "../../types/prisma"


export function useEvent(eventId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Event>(`/api/event/${eventId}`, fetcher, options)

    return {
        event: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useEvents(options?: SWRConfiguration) {
    const { data, error } = useSWR<Event[]>(`/api/events`, fetcher, options)
    console.log("ERROR: ", error)
    return {
        events: data,
        error: error,
        isLoading: !error && !data,
    }
}