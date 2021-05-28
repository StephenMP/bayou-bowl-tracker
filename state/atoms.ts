import { atom } from 'recoil';
import { User, Event, UserProfile, Team } from "@prisma/client";

const syncUserStateEffect = () => ({ setSelf }) => {
  const loadUser = async () => {
    const res = await fetch('/api/user')
    const user: User = await res.json()

    setSelf(user)
  }

  loadUser()
}

const syncUserProfileStateEffect = () => ({ setSelf }) => {
  const loadUserProfile = async () => {
    const res = await fetch(`/api/user/profile`)
    const userProfile: UserProfile = await res.json()

    setSelf(userProfile)
  }

  loadUserProfile()
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

const fetchAllTeamsEffect = () => ({ setSelf }) => {
  const loadUsers = async () => {
    const res = await fetch('/api/user/teams')
    const teams = await res.json()

    setSelf(teams)
  }

  loadUsers()
}

export const userState = atom({
  key: 'userState',
  default: {} as User,
  effects_UNSTABLE: [
    syncUserStateEffect()
  ]
});

export const userProfileState = atom({
  key: 'userProfileState',
  default: {} as UserProfile,
  effects_UNSTABLE: [
    syncUserProfileStateEffect()
  ]
});

export const usersState = atom({
  key: 'usersState',
  default: [] as User[],
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

export const userTeamsState = atom({
  key: 'userTeamsState',
  default: [] as Team[],
  effects_UNSTABLE: [
    fetchAllTeamsEffect()
  ]
})