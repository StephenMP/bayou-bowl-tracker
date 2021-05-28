import { withRedis } from '../util/redis'
import prisma from '../lib/prisma'
import { Event, Team } from '@prisma/client'
import {EventEntity} from '../entities/event-entity'

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

    async getAllEventsPrisma(): Promise<(Event & { teams: Team[] })[]> {
        const events = await prisma.event.findMany({
            include: {
                teams: true
            }
        })
        
        return events
    }

    async saveEvent(entity) {
        withRedis(async redis => {
            await redis.set(entity.id, JSON.stringify(entity))
        })
    }
}