import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { prisma } from '../../../../../lib/prisma'
import { queryParamAsString } from '../../../../../util/routes'
import { logger } from '../../../../../lib/logtail'
import { NextApiRequest, NextApiResponse } from 'next'
import { purgeFromCache } from '../../../../../lib/redis'
import { deleteAllEventScores } from '../../../../../repositories/event-score'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'DELETE') {
    const eventId = queryParamAsString(req.query.eventId)
    await deleteAllEventScores(eventId)
    res.status(200).json({ success: true })
  } else {
    res.status(405).end()
  }
}

export default withApiAuthRequired(handler)
