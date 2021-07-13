import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const data = await prisma.team.findMany({
                where: {
                    NOT: {
                        event_id: 'd3904f36-d679-47c5-bbc0-9cd32a517786'
                    }
                },
                include: {
                    team_members: true,
                    event: true
                }
            })

            res.status(200).json(data)
            break

        default:
            res.status(405).end()
            break
    }
}