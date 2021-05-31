import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import { readUser, updateUser, userIdFromAuth0Sub } from '../../repositories/user';
import { NextApiResponseServerIO } from '../../types/next';
import { queryParamAsString } from '../../util/routes';

function parseUserIdFromQuery(req: NextApiRequest, res: NextApiResponseServerIO): string {
    const userId = req.query.userId

    if (userId || userId?.length) {
        return queryParamAsString(userId)
    }

    const session = getSession(req, res)
    return userIdFromAuth0Sub(session.user.sub)
}

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    switch (req.method) {
        case 'GET':
            const userId = parseUserIdFromQuery(req, res)
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