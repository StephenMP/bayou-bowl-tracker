import { NextApiRequest, NextApiResponse } from 'next'
import { invalidateCache } from '../../../lib/redis'
import { queryParamAsString } from '../../../util/routes'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'DELETE':
      try {
        const pass = queryParamAsString(req.query.pass)
        if (pass === process.env.REDIS_CACHE_INVALIDATE_PASS) {
          await invalidateCache()
          res.status(200).json({ message: 'success' })
        } else {
          res.status(401).json({ message: 'You are not allowed :)' })
        }
      } catch (e) {
        if (e instanceof Error) {
          res.status(500).json({ message: e.message, error: e })
        } else {
          res.status(500).json({ message: 'Server Error', error: e })
        }
      }
      break

    default:
      res.status(405).end()
      break
  }
}
