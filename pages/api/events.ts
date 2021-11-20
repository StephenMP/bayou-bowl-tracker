import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { readEvents } from '../../repositories/event'

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const result = await readEvents()

      res.status(200).json(result)
      break

    default:
      res.status(405).end()
      break
  }
})
