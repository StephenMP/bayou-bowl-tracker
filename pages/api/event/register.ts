import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { readEvents } from '../../../repositories/event';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const events = await readEvents()
            res.status(200).json(events)
            break
        case 'POST':
            const { body } = req
            res.status(200).json({})
            break

        default:
            res.status(405).end()
            break
    }
})