import { getSession } from '@auth0/nextjs-auth0'
import { UserRepository } from '../../repositories/user-repository'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

const userRepository = new UserRepository()

async function getProfile(sub: string) {
    return await userRepository.getUserBySub(sub)
}

async function saveProfile(user: User) {
    await userRepository.updateUser(user)
}

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const session = getSession(req, res)
            const profile = await getProfile(session.user.sub)

            res.status(200).json(profile)
            break
        case 'POST':
            const { body }: { body: User } = req

            await saveProfile(body)

            res.status(200).json({})

            break

        default:
            res.status(405).end()
            break
    }
})