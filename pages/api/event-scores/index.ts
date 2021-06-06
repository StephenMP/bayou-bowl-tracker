import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import * as eventScoreRepository from '../../../repositories/event-score';
import { EventScore } from '../../../types/prisma';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const eventScoreToCreate: EventScore = req.body as EventScore
            await eventScoreRepository.createEventScore(eventScoreToCreate)

            res.status(200).json({})
            break
        case 'DELETE':
            const eventScoreToDelete: EventScore = req.body as EventScore

            if (eventScoreToDelete) {
                await eventScoreRepository.deleteEventScore(eventScoreToDelete.event_id, eventScoreToDelete.team_id, eventScoreToDelete.round_num)
                res.status(200).json({})
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