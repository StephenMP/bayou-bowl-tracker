
export const routes = {
    HOME: "/",
    RULES: "/rules",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    USER_PROFILE: "/user/profile",
    USER_EVENTS: "/user/events",
    ADMIN_USERS: "/admin/users",
    ADMIN_EVENTS: "/admin/events",
}

export function queryParamAsString(param: string | string[]): string {
    if (param) {
        return typeof param === 'string' ? param : param[0]
    }

    return ''
}