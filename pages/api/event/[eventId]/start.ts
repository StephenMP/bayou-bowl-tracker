import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../lib/prisma';
import { queryParamAsString } from '../../../../util/routes';
import { logger } from '../../../../lib/logtail'
import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { purgeFromCache } from '../../../../lib/redis';

export const config = {
    api: {
        externalResolver: true,
    },
}

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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

                logger.info('Started event successfully', { eventId })
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
}

export default withSentry(
    withApiAuthRequired(handler)
)