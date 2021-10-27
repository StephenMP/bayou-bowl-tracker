import { prisma } from '../../../lib/prisma'
import { readFromCache } from '../../../lib/redis'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const data = await readFromCache(
                'users',
                async () => {
                    return await prisma.user.findMany({
                        include: {
                            profile: true,
                        },
                    })
                },
                60 * 60 * 24
            )
            res.status(200).json(data)
            break

        default:
            res.status(405).end()
            break
    }
}
