import { firstBy } from 'thenby';
import * as eventScoreRepository from '../../../../repositories/event-score';
import { queryParamAsString } from '../../../../util/routes';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const teamId = queryParamAsString(req.query.teamId)

            if (teamId) {
                const event = await eventScoreRepository.readEventScoresForTeam(teamId)
                res.status(200).json(event.sort(firstBy('round_num')))
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