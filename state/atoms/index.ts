import { User, UserProfile } from "@prisma/client";
import { atom } from 'recoil';

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
})
