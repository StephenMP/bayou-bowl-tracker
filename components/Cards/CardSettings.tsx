import React, { ChangeEvent } from "react";
import { useToasts } from 'react-toast-notifications';
import { useRecoilState } from 'recoil';
import { useCurrentUser } from "../../lib/swr/user";
import { userNameState, userProfileState } from '../../state/atoms';
import { routes } from "../../util/routes";

export default function CardSettings() {
  const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
  const { user } = useCurrentUser({ suspense: true })
  const [userName, setUserName] = useRecoilState(userNameState)
  const [userProfile, setUserProfile] = useRecoilState(userProfileState)
  const { addToast, updateToast } = useToasts();

  const isUrl = (value: string) => {
    if (value.match(urlRegex)) {
      return true
    }

    if (
      value.includes('discord.gg')
      || value.includes('twitch.tv')
      || value.includes('twitter.com')
      || value.includes('steamcommunity.com')
    ) {
      return true
    }

    return false
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.id === 'name') {
      setUserName(event.target.value)
    }

    else {
      if (isUrl(event.target.value)) {
        alert("You do not need to enter any URLs, just your name on this platform")
        event.target.value = ''
        return
      }

      setUserProfile(oldProfile => {
        var newProfile = {
          ...oldProfile
        }

        newProfile[event.target.id] = event.target.value.trim()

        return newProfile
      })
    }
  }

  const saveUserProfile = async () => {
    const body = {
      ...userProfile
    }

    return await fetch(routes.api.user.profile, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })
  }

  const saveUserName = async () => {
    const body = {
      ...user,
      name: userName
    }

    return await fetch(routes.api.user.index, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })
  }

  const onSave = async () => {
    addToast('Saving...', { appearance: 'info', autoDismiss: true }, async toastId => {
      const saveProfilePromise = saveUserProfile()
      const saveUserNamePromise = saveUserName()
      const responses = await Promise.all([saveProfilePromise, saveUserNamePromise])

      if (responses.find(r => r.status > 299)) {
        updateToast(toastId, { content: 'Unable to save :(', appearance: 'error', autoDismiss: false });
      }

      else {
        updateToast(toastId, { content: 'Saved successfully', appearance: 'success', autoDismiss: true });
      }
    });
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              My Account
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    id='name'
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Steam Name
                  </label>
                  <input
                    id='steam_name'
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userProfile.steam_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Twitch
                  </label>
                  <input
                    id='twitch_name'
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userProfile.twitch_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Discord
                  </label>
                  <input
                    id='discord_name'
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userProfile.discord_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Twitter
                  </label>
                  <input
                    id='twitter_name'
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="your_handle"
                    defaultValue={userProfile.twitter_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    id="about_me"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows={4}
                    defaultValue={userProfile.about_me}
                    onChange={onInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
