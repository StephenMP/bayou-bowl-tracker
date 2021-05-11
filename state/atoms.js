import { atom } from 'recoil';
import { UserEntity } from "entities/user-entity";

const syncUserStateEffect = () => ({ setSelf }) => {
  const loadUser = async () => {
    const res = await fetch('/api/user')
    const user = await res.json()

    setSelf(user)
  }

  loadUser()
}

const fetchAllUsersEffect = () => ({ setSelf }) => {
  const loadUsers = async () => {
    const res = await fetch('/api/admin/users')
    const users = await res.json()

    setSelf(users)
  }

  loadUsers()
}

const fetchAllEventsEffect = () => ({ setSelf }) => {
  const loadUsers = async () => {
    const res = await fetch('/api/events')
    const events = await res.json()

    setSelf(events)
  }

  loadUsers()
}

export const userState = atom({
  key: 'userState',
  default: new UserEntity(),
  effects_UNSTABLE: [
    syncUserStateEffect()
  ]
});

export const usersState = atom({
  key: 'usersState',
  default: [],
  effects_UNSTABLE: [
    fetchAllUsersEffect()
  ]
});

export const eventsState = atom({
  key: 'eventsState',
  default: [],
  effects_UNSTABLE: [
    fetchAllEventsEffect()
  ]
})