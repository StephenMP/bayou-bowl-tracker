import Redis from 'ioredis'
import { logger } from './logtail'

function getRedis() {
  const result =
    global.gRedis ||
    new Redis(process.env.REDIS_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    })

  return result
}

export const redis = getRedis()

if (process.env.NODE_ENV !== 'production') {
  global.gRedis = redis
}

export async function purgeFromCache(key: string) {
  try {
    await redis.connect()
    await redis.del(key)
  } catch (e) {
    logger.error(e)
  }
}

export async function getCachedItem<TData>(key: string) {
  try {
    await redis.connect()
    const cached = await redis.get(key)
    if (cached) {
      return JSON.parse(cached) as TData
    }
  } catch (e) {
    logger.error(e)
    return null
  }
}

export async function setCachedItem(key: string, data: any) {
  try {
    await redis.connect()
    await redis.set(key, JSON.stringify(data))
  } catch (e) {
    logger.error(e)
    return null
  }
}

async function connect() {
  if (redis.status !== 'connecting' && redis.status !== 'connect' && redis.status !== 'ready') {
    try {
      await redis.connect()
    } catch (e) {
      logger.error(e)
      throw e
    }
  }
}

export async function invalidateCache() {
  try {
    await connect()
    await redis.flushall()
  } catch (e) {
    logger.error(e)
  }
}

export async function readFromCache<TData>(
  key: string,
  setCacheIfMissed: () => Promise<TData>,
  ttl?: number
): Promise<TData> {
  let result: TData = {} as TData

  try {
    await connect()
    const cached = await redis.get(key)
    if (cached) {
      try {
        result = JSON.parse(cached) as TData
        logger.info('Returning cached data', { key })
      } catch (e) {
        logger.error(e)
        await purgeFromCache(key)
        result = await setCacheIfMissed()
        await redis.set(key, JSON.stringify(result), 'EX', ttl || '3600')
      }
    } else {
      logger.info('Cache miss', { key })
      result = await setCacheIfMissed()
      await redis.set(key, JSON.stringify(result), 'EX', ttl || '3600')
    }
  } catch (e) {
    logger.error(e)
    result = await setCacheIfMissed()
  } finally {
    return result
  }
}
