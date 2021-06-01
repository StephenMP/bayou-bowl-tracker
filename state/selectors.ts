import { selectorFamily } from 'recoil';
import { EventWithTeamsAndScores } from '../types/event';

export const loadEventSelector = selectorFamily({
    key: 'loadEventSelector',
    get: eventId => async (): Promise<EventWithTeamsAndScores> => {
        const res = await fetch(`/api/event/${eventId.toString()}`)
        const event: EventWithTeamsAndScores = await res.json()

        return event;
    },
});

export const loadUserSelector = selectorFamily({
    key: 'loadUserSelector',
    get: userId => async (): Promise<EventWithTeamsAndScores> => {
        const res = await fetch(`/api/user?userId=${userId.toString()}`)
        const event: EventWithTeamsAndScores = await res.json()

        return event;
    },
})