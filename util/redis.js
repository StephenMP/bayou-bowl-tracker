import Redis from 'ioredis'
import { constants } from './constants'

export const getRedisContext = () => new Redis(constants.REDIS_URL)
