import * as eventScoreRepository from '../../../../repositories/event-score';
import { queryParamAsString } from '../../../../util/routes';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)

            if (eventId) {
                const event = await eventScoreRepository.readEventScoresForEvent(eventId)
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
}