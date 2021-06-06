import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { readTeamByEventAndUser } from '../../../../../repositories/team';
import { queryParamAsString } from '../../../../../util/routes';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)
            const userId = queryParamAsString(req.query.userId)

            if (eventId) {
                const event = await readTeamByEventAndUser(eventId, userId)
                res.status(200).json(event)
            }

            else {
                res.status(400).end()
            }

            break

        default:
            res.status(405).end()
            break
    }
})