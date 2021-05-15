import { EventEntity } from '../../entities/event-entity'
import { EventRepository } from '../../repositories/event-repository'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const eventRepository = new EventRepository()

async function getEvents() {
    return await eventRepository.getAllEvents()
}

async function saveEvent(eventEntity) {
    await eventRepository.saveEvent(eventEntity)
}

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const events = await getEvents()
            res.status(200).json(events)
            break
        case 'POST':
            const { body } = req
            const entity = EventEntity.new()
            entity.name = body.name
            entity.startDate = new Date(body.startDate)
            entity.picture = body.picture
            await saveEvent(entity)
            res.status(200).json({})
            break

        default:
            res.status(405).end()
            break
    }
})