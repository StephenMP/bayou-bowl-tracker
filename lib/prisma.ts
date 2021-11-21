import { PrismaClient } from '@prisma/client'
import { logger } from './logtail'

function getClient(): PrismaClient {
    if (global.gPrisma) {
        return global.gPrisma
    }

    const connectionString = process.env.DATABASE_CONNECTION_POOL_URL! || process.env.DATABASE_URL!
    console.log(`Connecting w/ ${connectionString.includes('pgbouncer') ? 'pgbouncer' : 'direct'}`)
    const client = new PrismaClient({
        datasources: {
            db: {
                url: connectionString,
            },
        },
        // log: [
        //     {
        //         emit: 'event',
        //         level: 'query',
        //     },
        //     {
        //         emit: 'event',
        //         level: 'error',
        //     },
        //     {
        //         emit: 'event',
        //         level: 'info',
        //     },
        //     {
        //         emit: 'event',
        //         level: 'warn',
        //     },
        // ],
    })

    // client.$on('query', (e) => {
    //     logger.debug('DB query executed', e)
    // })

    // client.$on('error', (e) => {
    //     logger.error('DB query executed', e)
    // })

    // client.$on('info', (e) => {
    //     logger.info('DB query executed', e)
    // })

    // client.$on('warn', (e) => {
    //     logger.warn('DB query executed', e)
    // })

    return client
}

export const prisma: PrismaClient = getClient()

if (process.env.NODE_ENV !== 'production') {
    global.gPrisma = prisma
}
