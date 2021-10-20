import { prisma } from '../../../lib/prisma';
import { queryParamAsString } from '../../../util/routes';

async function getEventById(id: string) {
    return await prisma.event.findUnique({
        where: {
            id: id
        },
        include: {
            scores: true,
            teams: true
        }
    })
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const { eventId } = req.query

            if (eventId) {
                const id = queryParamAsString(eventId)
                const event = await getEventById(id)
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