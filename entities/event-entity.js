import * as uuid from 'uuid'

export class EventEntity {
  id
  name
  startDate
  picture
  match_type
  teams
  
  static new() {
    const entity = new EventEntity()
    entity.id = `event-${uuid.v4()}`

    return entity
  }
}