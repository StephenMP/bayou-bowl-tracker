import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { userIdFromAuth0Sub } from '../../../repositories/user';
import { Team, TeamMemberType } from '../../../types/prisma';
import { queryParamAsString } from '../../../util/routes';

function getUserId(req: NextApiRequest, res: NextApiResponse): string {
    const session = getSession(req, res)
    return userIdFromAuth0Sub(session.user.sub)
}

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const session = getSession(req, res)
            let isCaptain = parseInt(queryParamAsString(req.query.c)) === 1

            if (!session) {
                res.status(401).json('You need to sign in at https://bayoubowl.gg first, then click the link again')
            }

            else {
                const team: Team = await prisma.team.findUnique({
                    where: {
                        id: queryParamAsString(req.query.testTeamId),
                    },
                    include: {
                        team_members: true
                    }
                })

                if(team.team_members.find(m => m.member_type === TeamMemberType.CAPTAIN)) {
                    isCaptain = false
                }

                await prisma.teamMember.create({
                    data: {
                        member_type: isCaptain ? TeamMemberType.CAPTAIN : TeamMemberType.MEMBER,
                        team_id: queryParamAsString(req.query.testTeamId),
                        user_id: getUserId(req, res),
                    }
                })

                await prisma.teamMember.create({
                    data: {
                        member_type: isCaptain ? TeamMemberType.CAPTAIN : TeamMemberType.MEMBER,
                        team_id: queryParamAsString(req.query.eventTeamId),
                        user_id: getUserId(req, res),
                    }
                })

                res.status(200).json(`You've joined ${team.name} as ${isCaptain ? 'the ' + TeamMemberType.CAPTAIN.toLowerCase() : 'a ' + TeamMemberType.MEMBER.toLowerCase()}! You can close this now :)`)
            }
            break

        default:
            res.status(405).end()
            break
    }
}