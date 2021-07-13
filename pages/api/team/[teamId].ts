import prisma from '../../../lib/prisma';
import { readTeam } from '../../../repositories/team';
import { queryParamAsString } from '../../../util/routes';

export default async function handler(req, res) {
    const teamId = queryParamAsString(req.query.teamId)

    switch (req.method) {
        case 'GET':
            if (teamId) {
                const event = await readTeam(teamId)
                res.status(200).json(event)
            }

            else {
                res.status(400).end()
            }

            break

        case 'DELETE':
            // Delete team scores
            await prisma.teamScore.deleteMany({
                where: {
                    team_id: teamId
                }
            })

            // Delete player scores
            await prisma.playerScore.deleteMany({
                where: {
                    team_id: teamId
                }
            })

            // Delete event scores
            await prisma.eventScore.deleteMany({
                where: {
                    team_id: teamId
                }
            })

            // Delete team members
            await prisma.teamMember.deleteMany({
                where: {
                    team_id: teamId
                }
            })

            // Delete team
            await prisma.team.delete({
                where: {
                    id: teamId
                }
            })

            res.status(200).json({})

            break
        default:
            res.status(405).end()
            break
    }
}