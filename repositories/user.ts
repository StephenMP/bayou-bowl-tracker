import { prisma } from '../lib/prisma'
import { getCachedItem, purgeFromCache } from '../lib/redis'
import { User } from '../types/prisma'

const client = () => prisma.user

export function userIdFromAuth0Sub(sub: string) {
    return sub.split('|')[1]
}

export type UserReadOpts = {
    include: {
        profile: boolean,
        player_scores: boolean
    }
}

const DefaultReadOpts: UserReadOpts = {
    include: {
        profile: true,
        player_scores: true
    }
}

export async function createUser(user: User): Promise<void> {
    const createdUser = await client().upsert({
        where: { id: user.id ?? userIdFromAuth0Sub(user.sub) },
        update: {},
        create: {
            ...user,
            id: userIdFromAuth0Sub(user.sub),
            profile: {
                create: {}
            }
        }
    })

    // Update cache
    await purgeFromCache('users')
}

export async function updateUser(user: User): Promise<void> {
    await client().update({
        where: { id: user.id },
        data: {
            updatedDate: new Date(),
            name: user.name,
            nickname: user.nickname,
            picture: user.picture,
            email: user.email,
        }
    })
}

export async function readUser(id: string, opts: UserReadOpts = DefaultReadOpts): Promise<User> {
    return await client().findUnique({
        where: { id },
        include: opts.include
    })
}

export async function readUserBySub(sub: string, opts: UserReadOpts = DefaultReadOpts): Promise<User> {
    return await client().findUnique({
        where: { id: userIdFromAuth0Sub(sub) },
        include: opts.include
    })
}

export async function readUsers(opts: UserReadOpts = DefaultReadOpts): Promise<Array<User>> {
    return await client().findMany({
        include: opts.include
    })
}
