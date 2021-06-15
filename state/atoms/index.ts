import { User, UserProfile } from "@prisma/client";
import { atom } from 'recoil';
import { routes } from "../../util/routes";

const syncUserProfileStateEffect = () => ({ setSelf }) => {
  const loadUserProfile = async () => {
    const res = await fetch(routes.api.user.profile)
    const userProfile: UserProfile = await res.json()

    setSelf(userProfile)
  }

  loadUserProfile()
}

const fetchAllUsersEffect = () => ({ setSelf }) => {
  const loadUsers = async () => {
    const res = await fetch(routes.api.admin.users)
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
