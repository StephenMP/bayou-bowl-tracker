import { prisma } from '../../../lib/prisma';
import { readFromCache } from '../../../lib/redis';
import { queryParamAsString } from '../../../util/routes';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)
            const result = await readFromCache(`teams-${eventId}`, async () => {
                return await prisma.team.findMany({
                    where: {
                        event_id: eventId
                    },
                    include: {
                        team_members: true
                    }
                })
            }, 86400)

            res.status(200).json(result)
            break

        default:
            res.status(405).end()
            break
    }
}