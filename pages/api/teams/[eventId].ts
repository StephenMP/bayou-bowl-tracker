import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { queryParamAsString } from '../../../util/routes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const eventId = queryParamAsString(req.query.eventId)
      const result = await prisma.team.findMany({
        where: {
          event_id: eventId,
        },
        include: {
          team_members: true,
        },
      })

      res.status(200).json(result)
      break

    default:
      res.status(405).end()
      break
  }
}
