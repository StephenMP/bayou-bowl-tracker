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
  if (redis.status !== 'connecting' && redis.status !== 'connect' && redis.status !== 'ready') {
    try {
      await redis.connect()
      logger.info('Purged from cache', { key })
    } catch (e) {
      logger.error(e)
    }
  }

  await redis.del(key)
}

export async function getCachedItem<TData>(key: string) {
  if (redis.status !== 'connecting' && redis.status !== 'connect' && redis.status !== 'ready') {
    try {
      await redis.connect()
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  try {
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
  if (redis.status !== 'connecting' && redis.status !== 'connect' && redis.status !== 'ready') {
    try {
      await redis.connect()
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  try {
    await redis.set(key, JSON.stringify(data))
  } catch (e) {
    logger.error(e)
    return null
  }
}

export async function readFromCache<TData>(
  key: string,
  setCacheIfMissed: () => Promise<TData>,
  ttl?: number
): Promise<TData> {
  if (redis.status !== 'connecting' && redis.status !== 'connect' && redis.status !== 'ready') {
    try {
      await redis.connect()
    } catch (e) {
      logger.error(e)
      return setCacheIfMissed()
    }
  }

  try {
    let cached = await redis.get(key)
    if (cached) {
      logger.info('Returning cached data', { key })
      return JSON.parse(cached)
    } else {
      logger.info('Cache miss', { key })
      const result: TData = await setCacheIfMissed()
      await redis.set(key, JSON.stringify(result), 'EX', ttl || '3600')
      return result
    }
  } catch (e) {
    logger.error(e)
    return await setCacheIfMissed()
  }
}
