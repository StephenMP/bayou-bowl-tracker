import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { readUsers } from '../../../repositories/user';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const users = await readUsers()
            res.status(200).json(users)
            break

        default:
            res.status(405).end()
            break
    }
})