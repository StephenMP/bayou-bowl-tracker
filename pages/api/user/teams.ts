import { getSession } from '@auth0/nextjs-auth0'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma'

async function getUserTeams(sub: string) {
    const userId = sub.split('|')[1]
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    return await prisma.team.findMany({
        where: {
            team_members: {
                some: {
                    user_id: user.id
                }
            }
        },
        include: {
            team_members: true
        }
    })
}

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const session = getSession(req, res)
            const teams = await getUserTeams(session.user.sub)

            res.status(200).json(teams)
            break
        default:
            res.status(405).end()
            break
    }
})