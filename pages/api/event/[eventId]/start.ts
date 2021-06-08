import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '../../../../lib/prisma';
import { queryParamAsString } from '../../../../util/routes';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)

            if (eventId) {
                await prisma.event.update({
                    data: {
                        isActive: true
                    },
                    where: {
                        id: eventId
                    }
                })

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