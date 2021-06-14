import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import { readUser, updateUser, userIdFromAuth0Sub } from '../../../repositories/user';
import { NextApiResponseServerIO } from '../../../types/next';

function getUserId(req: NextApiRequest, res: NextApiResponseServerIO): string {
    const session = getSession(req, res)
    return userIdFromAuth0Sub(session.user.sub)
}

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    switch (req.method) {
        case 'GET':
            const userId = getUserId(req, res)
            const user = await readUser(userId)

            res.status(200).json(user)
            break
        case 'POST':
            const { body }: { body: User } = req
            await updateUser(body)

            res.status(200).json({})
            break

        default:
            res.status(405).end()
            break
    }
})