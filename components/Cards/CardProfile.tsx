import { UserProfile } from '@prisma/client'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { useCurrentUser } from '../../lib/swr/user'
import { userNameState, userProfileState } from '../../state/atoms'
import Image from 'next/image'

export default function CardProfile() {
  const { user } = useCurrentUser({ suspense: true })
  const userName: string = useRecoilValue(userNameState)
  const userProfile: UserProfile = useRecoilValue(userProfileState)

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <div className="h-auto align-middle absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                  <Image
                    alt="..."
                    height={150}
                    width={150}
                    src={user.picture}
                    className="shadow-xl rounded-full border-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{/* 22 */}</span>
                  <span className="text-sm text-blueGray-400">{/* Friends */}</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{/* 10 */}</span>
                  <span className="text-sm text-blueGray-400">{/* Photos */}</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{/* 89 */}</span>
                  <span className="text-sm text-blueGray-400">{/* Comments */}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{userName}</h3>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
              {user.email}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fab fa-twitch mr-2 text-lg text-blueGray-400"></i>
              <a href={'https://twitch.tv/' + userProfile.twitch_name} target="_blank" rel="noopener noreferrer">
                {userProfile.twitch_name}
              </a>
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fab fa-steam mr-2 text-lg text-blueGray-400"></i>
              {userProfile.steam_name}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fab fa-discord mr-2 text-lg text-blueGray-400"></i>
              {userProfile.discord_name}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fab fa-twitter mr-2 text-lg text-blueGray-400"></i>
              <a href={'https://twitter.com/' + userProfile.twitter_name} target="_blank" rel="noopener noreferrer">
                {userProfile.twitter_name}
              </a>
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <h3 className="text-lg font-semibold leading-normal mb-2 text-blueGray-700 mb-2">About Me</h3>
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">{userProfile.about_me}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
