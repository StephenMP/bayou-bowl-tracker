import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { logger } from '../../../../lib/logtail';
import { prisma } from '../../../../lib/prisma';
import { purgeFromCache } from '../../../../lib/redis';
import { queryParamAsString } from '../../../../util/routes';

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const eventId = queryParamAsString(req.query.eventId)

            if (eventId) {
                await prisma.event.update({
                    data: {
                        isActive: false
                    },
                    where: {
                        id: eventId
                    }
                })

                logger.info('Stopped event successfully', { eventId })
                await purgeFromCache('events')
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