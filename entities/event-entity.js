import * as uuid from 'uuid'

export class EventEntity {
  id
  name
  startDate
  picture
  registeredUsers
  teams

  static new() {
    const entity = new EventEntity()
    entity.id = `event-${uuid.v4()}`
    entity.registeredUsers = []
    entity.teams = []

    return entity
  }
}