import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { readUser } from '../../../repositories/user';
import { queryParamAsString } from '../../../util/routes';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const userId = queryParamAsString(req.query.userId)
            const profile = await readUser(userId)

            res.status(200).json(profile)
            break

        default:
            res.status(405).end()
            break
    }
})