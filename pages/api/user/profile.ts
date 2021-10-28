import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { UserProfile } from '@prisma/client'
import { prisma } from '../../../lib/prisma'
import { readFromCache, setCachedItem } from '../../../lib/redis'

async function getUserProfile(sub: string) {
  const userId = sub.split('|')[1]
  return await prisma.userProfile.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
  })
}

async function saveProfile(userProfile: UserProfile) {
  await prisma.userProfile.update({
    where: { id: userProfile.id },
    data: userProfile,
  })
}

function getCacheKey(session: Session): string {
  return `/api/user/profile - ${session.user.sub}`
}

export default withApiAuthRequired(async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const session = getSession(req, res)

      const data = await readFromCache(getCacheKey(session), async () => {
        return await getUserProfile(session.user.sub)
      })

      res.status(200).json(data)
      break
    case 'POST':
      const { body }: { body: UserProfile } = req
      await saveProfile(body)

      await setCachedItem(getCacheKey(getSession(req, res)), body)

      res.status(200).json({})

      break

    default:
      res.status(405).end()
      break
  }
})
