import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const data = await prisma.user.findMany({
        include: {
          profile: true,
        },
      })
      res.status(200).json(data)
      break

    default:
      res.status(405).end()
      break
  }
}
