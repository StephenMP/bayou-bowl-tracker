import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@prisma/client';
import { prisma } from '../../../lib/prisma';

async function getUserProfile(sub: string) {
    const userId = sub.split('|')[1]
    return await prisma.userProfile.findFirst({
        where: {
            user: {
                id: userId
            }
        }
    })
}

async function saveProfile(userProfile: UserProfile) {
    await prisma.userProfile.update({
        where: { id: userProfile.id },
        data: userProfile
    })
}

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const session = getSession(req, res)
            const profile = await getUserProfile(session.user.sub)

            res.status(200).json(profile)
            break
        case 'POST':
            const { body }: { body: UserProfile } = req
            await saveProfile(body)

            res.status(200).json({})

            break

        default:
            res.status(405).end()
            break
    }
})