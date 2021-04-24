import { getSession } from '@auth0/nextjs-auth0'
import { UserRepository } from 'repositories/user-repository'

const userRepository = new UserRepository()

async function getProfile(sub) {
    return await userRepository.getUserById(sub.split('|')[1])
}

async function saveProfile(userEntity) {
    await userRepository.saveUser(userEntity)
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const session = getSession(req, res)
            const profile = await getProfile(session.user.sub)

            res.status(200).json(profile)
            break
        case 'POST':
            const { body } = req

            await saveProfile(body)

            res.status(200).json({})

            break

        default:
            res.status(405).end()
            break
    }
}