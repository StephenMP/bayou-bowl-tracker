import { getSession } from '@auth0/nextjs-auth0'
import { UserRepository } from 'repositories/user-repository'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const userRepository = new UserRepository()

async function getProfile(user) {
    return await userRepository.getUserById(`user-${user.sub.split('|')[1]}`)
}

async function saveProfile(userEntity) {
    await userRepository.saveUser(userEntity)
}

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const session = getSession(req, res)
            const profile = await getProfile(session.user)

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
})