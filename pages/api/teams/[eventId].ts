import prisma from '../../../lib/prisma';
import { queryParamAsString } from '../../../util/routes';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)
            const data = await prisma.team.findMany({
                where: {
                    event_id: eventId
                },
                include: {
                    team_members: true
                }
            })

            res.status(200).json(data)
            break

        default:
            res.status(405).end()
            break
    }
}