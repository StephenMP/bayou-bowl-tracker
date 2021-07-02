import { atom } from 'recoil';
import { User, UserProfile } from "../../types/prisma";
import { routes } from "../../util/routes";

const syncUserNameStateEffect = () => ({ setSelf }) => {
  const loadUserProfile = async () => {
    const res = await fetch(routes.api.user.index)
    const user: User = await res.json()

    setSelf(user.name)
  }

  loadUserProfile()
}

const syncUserProfileStateEffect = () => ({ setSelf }) => {
  const loadUserProfile = async () => {
    const res = await fetch(routes.api.user.profile)
    const userProfile: UserProfile = await res.json()

    setSelf(userProfile)
  }

  loadUserProfile()
}

export const userProfileState = atom({
  key: 'userProfileState',
  default: {} as UserProfile,
  effects_UNSTABLE: [
    syncUserProfileStateEffect()
  ]
});

export const userNameState = atom({
  key: 'userNameState',
  default: '',
  effects_UNSTABLE: [
    syncUserNameStateEffect()
  ]
})