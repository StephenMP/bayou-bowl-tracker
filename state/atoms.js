import { atom } from 'recoil';
import { UserEntity } from "entities/user-entity";

const syncUserStateEffect = () => ({ setSelf }) => {
  const loadUser = async () => {
    console.log("Fetching user")
    const res = await fetch('/api/user')
    const user = await res.json()

    setSelf(user)
  }

  loadUser()
}

const fetchAllUsersEffect = () => ({ setSelf }) => {
  const loadUsers = async () => {
    console.log("Fetching all users")
    const res = await fetch('/api/admin/users')
    const users = await res.json()

    setSelf(users)
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