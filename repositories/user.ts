import { User } from '@prisma/client'
import prisma from '../lib/prisma'
import { UserWithProfile } from '../types/user'

const client = () => prisma.user

export function userIdFromAuth0Sub(sub: string) {
    return sub.split('|')[1]
}

export type ReadUser = User | UserWithProfile

export type UserReadOpts = {
    include: {
        profile: boolean,
        event_scores: boolean
    }
}

const DefaultReadOpts: UserReadOpts = {
    include: {
        profile: false,
        event_scores: false
    }
}

export async function createUser(user: User): Promise<void> {
    await client().upsert({
        where: { id: user.id ?? userIdFromAuth0Sub(user.sub) },
        update: {},
        create: {
            ...user,
            id: userIdFromAuth0Sub(user.sub)
        }
    })
}

export async function updateUser(user: User): Promise<void> {
    await client().update({
        where: { id: user.id },
        data: user
    })
}

export async function readUser(id: string, opts: UserReadOpts = DefaultReadOpts): Promise<ReadUser> {
    return await client().findUnique({
        where: { id },
        include: opts.include
    })
}

export async function readUserBySub(sub: string, opts: UserReadOpts = DefaultReadOpts): Promise<ReadUser> {
    return await client().findUnique({
        where: { id: userIdFromAuth0Sub(sub) },
        include: opts.include
    })
}

export async function readUsers(opts: UserReadOpts = DefaultReadOpts): Promise<Array<ReadUser>> {
    return await client().findMany({
        include: opts.include
    })
}
