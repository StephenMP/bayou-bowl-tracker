
export const routes = {
    home: '/',
    instructions: '/instructions',
    news: '/news',
    rules: '/rules',
    teams: '/teams/bb2',
    admin: {
        events: '/admin/events',
        users: '/admin/users',
        teams: {
            index: '/admin/teams',
            open: '/admin/teams/open',
            seeded: '/admin/teams/seeded'
        },
    },
    api: {
        admin: {
            users: '/api/admin/users'
        },
        auth: {
            login: '/api/auth/login',
            logout: '/api/auth/logout',
            callback: '/api/auth/callback',
            me: '/api/auth/me',
        },
        event: {
            eventId: {
                index: (eventId: string) => `/api/event/${eventId}`,
                toggleActive: (eventId: string, action: 'start' | 'stop') => `/api/event/${eventId}/${action}`,
                team: {
                    userId: (eventId: string, userId: string) => `/api/event/${eventId}/team/${userId}`,
                }
            },
            register: '/api/event/register'
        },
        event_scores: {
            event: {
                eventId: (eventId: string) => `/api/event-scores/event/${eventId}`
            },
            team: {
                teamId: (teamId: string) => `/api/event-scores/team/${teamId}`
            },
            index: '/api/event-scores',
            bb2: '/api/leaderboard/bb2',
            bb3: '/api/leaderboard/bb3',
        },
        leaderboard: {
            eventId: (eventId: string) => `/api/leaderboard/${eventId}`,
        },
        team: {
            teamId: (teamId: string) => `/api/team/${teamId}`
        },
        teams: {
            index: '/api/teams',
            eventId: (eventId: string) => `/api/teams/${eventId}`
        },
        user: {
            userId: (userId: string) => `/api/user/${userId}`,
            index: '/api/user',
            profile: '/api/user/profile',
            teams: '/api/user/teams'
        },
        events: {
            index: '/api/events'
        }
    },
    leaderboard: {
        obs: {
            eventId: (eventId: string) => `/leaderboard/obs/${eventId}`,
        },
        eventId: (eventId: string) => `/leaderboard/${eventId}`,
        bb2: `/leaderboard/bb2`
    },
    team: {
        teamId: (teamId: string) => `/team/${teamId}`
    },
    user: {
        event: {
            register: {
                eventId: (eventId: string) => `/user/event/register/${eventId}`
            },
            eventId: (eventId: string) => `/user/event/${eventId}`
        },
        events: '/user/events',
        profile: '/user/profile'
    }
}

export function queryParamAsString(param: string | string[]): string {
    if (param) {
        return typeof param === 'string' ? param : param[0]
    }

    return null
}