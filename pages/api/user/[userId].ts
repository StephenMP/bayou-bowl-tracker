import { readUser } from '../../../repositories/user';
import { queryParamAsString } from '../../../util/routes';

export default async function handler(req, res) {
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
}