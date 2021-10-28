import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { purgeFromCache } from '../../../lib/redis'
import { readEvents } from '../../../repositories/event'
import { userIdFromAuth0Sub } from '../../../repositories/user'
import { TeamMemberType, User } from '../../../types/prisma'

async function getUser(req: NextApiRequest, res: NextApiResponse): Promise<User> {
  const session = getSession(req, res)
  const userId = userIdFromAuth0Sub(session.user.sub)
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  })
}

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'GET') {
    const events = await readEvents()
    res.status(200).json(events)
  } else if (req.method === 'POST') {
    const currentUser = await getUser(req, res)
    const { eventId } = req.body

    if (currentUser.profile && currentUser.profile.steam_name) {
      try {
        await prisma.team.create({
          data: {
            name: currentUser.profile.steam_name,
            event: {
              connect: {
                id: eventId as string,
              },
            },
            team_members: {
              create: {
                user_id: currentUser.id,
                member_type: TeamMemberType.CAPTAIN,
              },
            },
          },
        })

        await purgeFromCache('teams-438fd5b5-3a3d-44ce-8e51-339fa5c4c916')
        res.status(200).json({})
      } catch (e) {
        res.status(500).json({
          error: 'There was an error on the server. Please contact support.',
        })
      }
    } else {
      res.status(400).json({
        error: 'You must set your Steam Username in your account profile before registering for this event',
      })
    }
  } else if (req.method === 'DELETE') {
    const currentUser = await getUser(req, res)
    const { eventId } = req.body

    try {
      await prisma.team.deleteMany({
        where: {
          AND: [
            {
              event_id: eventId,
            },
            {
              team_members: {
                some: {
                  user_id: currentUser.id,
                },
              },
            },
          ],
        },
      })

      await purgeFromCache('teams-438fd5b5-3a3d-44ce-8e51-339fa5c4c916')
      res.status(200).json({})
    } catch (e) {
      res.status(500).json({
        error: 'There was an error on the server. Please contact support.',
      })
    }
  } else {
    res.status(405).end()
  }
})
