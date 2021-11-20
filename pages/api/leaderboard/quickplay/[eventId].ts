import { NextApiRequest, NextApiResponse } from 'next'
import { queryParamAsString } from '../../../../util/routes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const eventId = queryParamAsString(req.query.eventId)

      if (eventId) {
        const data = await Promise.resolve([])
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
