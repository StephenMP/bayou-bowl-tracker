import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { readEvents } from '../../repositories/event';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const events = await readEvents({include: {teams: true}})
            res.status(200).json(events)
            break

        default:
            res.status(405).end()
            break
    }
})