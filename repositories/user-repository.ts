import { User } from '@prisma/client'
import prisma from '../lib/prisma'

function userIdFromAuth0Sub(sub: string) {
    return sub.split('|')[1]
}

export class UserRepository {
    async saveNewUser(user: User) {
        const existingUser = await prisma.user.findUnique({
            where: { id: userIdFromAuth0Sub(user.sub) }
        })

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    ...user,
                    id: userIdFromAuth0Sub(user.sub),
                    profile: {
                        create: {}
                    }
                }
            })
        }
    }

    async updateUser(user: User) {
        await prisma.user.update({
            where: { id: user.id },
            data: user
        })
    }

    async getUserById(id: string) {
        return await prisma.user.findUnique({
            where: { id: id }
        })
    }

    async getUserBySub(sub: string) {
        return await prisma.user.findFirst({
            where: { sub: sub }
        })
    }

    async getAllUsers(): Promise<Array<User>> {
        return await prisma.user.findMany()
    }
}