import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const data = await prisma.team.findMany({
                include: {
                    team_members: true
                }
            })

            res.status(200).json(data)
            break

        default:
            res.status(405).end()
            break
    }
}