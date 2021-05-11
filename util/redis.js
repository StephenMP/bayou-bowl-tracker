import Redis from 'ioredis'
import { constants } from './constants'

export const getRedisContext = () => new Redis(constants.REDIS_URL)

export const withRedis = async (callback) => {
    const redis = new Redis(constants.REDIS_URL)

    try {
        return await callback(redis)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        redis.quit()
    }
}