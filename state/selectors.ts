import { selectorFamily } from 'recoil';
import { Event } from '../types/prisma';

export const loadEventSelector = selectorFamily({
    key: 'loadEventSelector',
    get: eventId => async (): Promise<Event> => {
        const res = await fetch(`/api/event/${eventId.toString()}`)
        const event: Event = await res.json()

        return event;
    },
});

export const loadUserSelector = selectorFamily({
    key: 'loadUserSelector',
    get: userId => async (): Promise<Event> => {
        const res = await fetch(`/api/user?userId=${userId.toString()}`)
        const event: Event = await res.json()

        return event;
    },
})