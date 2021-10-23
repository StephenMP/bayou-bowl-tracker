import Redis from 'ioredis'
import { constants } from './constants'
import { logger } from '../lib/logtail'

export const getRedisContext = () => new Redis(constants.REDIS_URL)

export const withRedis = async (callback: (redis: any) => any) => {
    const redis = new Redis(constants.REDIS_URL)

    try {
        return await callback(redis)
    }
    catch (error) {
        logger.error(error)
    }
    finally {
        redis.quit()
    }
}