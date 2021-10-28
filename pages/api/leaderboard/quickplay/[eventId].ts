import { readFromCache } from '../../../../lib/redis'
import { EventScoreByTeam } from '../../../../lib/swr/event-score'
import * as eventScoreRepository from '../../../../repositories/event-score'
import { EventScore, PlayerScore } from '../../../../types/prisma'
import { queryParamAsString } from '../../../../util/routes'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)

            if (eventId) {
                const data = await readFromCache(`leaderboard/quickplay/${eventId}`, async () => {
                    return Promise.resolve([])
                })

                res.status(200).json(data)
            } else {
                res.status(400).end()
            }

            break

        default:
            res.status(405).end()
            break
    }
}
