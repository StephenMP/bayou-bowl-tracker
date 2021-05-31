import prisma from '../../../lib/prisma'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
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

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const { eventId } = req.query
            console.log(eventId)

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
})