import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { Event } from "../../types/prisma"
import { routes } from "../../util/routes"


export function useEvent(eventId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<Event>(routes.api.event.eventId.index(eventId), fetcher, options)

    return {
        event: data,
        error: error,
        isLoading: !error && !data,
    }
}

export function useEvents(options?: SWRConfiguration) {
    const { data, error } = useSWR<Event[]>(routes.api.events.index, fetcher, options)

    return {
        events: data,
        error: error,
        isLoading: !error && !data,
    }
}