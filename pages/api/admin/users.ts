import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const users = await prisma.user.findMany({
                include: {
                    profile: true
                }
            })
            res.status(200).json(users)
            break

        default:
            res.status(405).end()
            break
    }
}