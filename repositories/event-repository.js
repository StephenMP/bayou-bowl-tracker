import { EventEntity } from 'entities/event-entity'
import { getRedisContext, withRedis } from '../util/redis'

export class EventRepository {
    async getAllEvents() {
        return withRedis(async redis => {
            const entities = []
            const keys = await redis.keys('event-*')
            const entitiesJson = await redis.mget(keys)

            for (var i = 0; i < entitiesJson.length; i++) {
                const entity = JSON.parse(entitiesJson[i])
                entities.push(Object.assign(new EventEntity(), entity))
            }

            return entities
        })
    }

    async saveEvent(entity) {
        withRedis(async redis => {
            await redis.set(entity.id, JSON.stringify(entity))
        })
    }

    // async saveEvent(entity) {
    //     const redis = getRedisContext()
    //     try {
    //         await redis.set(entity.id, JSON.stringify(entity))
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    //     finally {
    //         redis.quit()
    //     }
    // }
}