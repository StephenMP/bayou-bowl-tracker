import { UserProfile } from "@prisma/client";
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

export const userProfileState = atom({
  key: 'userProfileState',
  default: {} as UserProfile,
  effects_UNSTABLE: [
    syncUserProfileStateEffect()
  ]
});

