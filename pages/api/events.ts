import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { readEvents } from '../../repositories/event'
import { readFromCache } from '../../lib/redis'

export default withApiAuthRequired(async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const result = await readFromCache('events', async () => {
        return await readEvents()
      })

      res.status(200).json(result)
      break

    default:
      res.status(405).end()
      break
  }
})
