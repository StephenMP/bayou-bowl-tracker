import { UserRepository } from 'repositories/user-repository'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const userRepository = new UserRepository()

async function getAllUsers() {
    return await userRepository.getAllUsers()
}

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const users = await getAllUsers()
            res.status(200).json(users)
            break

        default:
            res.status(405).end()
            break
    }
})