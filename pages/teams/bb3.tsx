import { UserType } from '.prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import { firstBy } from 'thenby'
import Footer from '../../components/Footers/Footer'
import Navbar from '../../components/Navbars/AuthNavbar'
import Spinner from '../../components/PageChange/Spinner'
import { useTeamsForEvent } from '../../lib/swr'
import { useCurrentUser, useCurrentUserTeams, useUser } from '../../lib/swr/user'

export default function Landing() {
  const router = useRouter()
  const { user, isLoading: userIsLoading } = useCurrentUser({
    suspense: false,
  })
  const { teams, isLoading: teamsLoading } = useTeamsForEvent('438fd5b5-3a3d-44ce-8e51-339fa5c4c916', {
    suspense: false,
    refreshInterval: 30,
  })

  if (userIsLoading) {
    return <Spinner light={true} />
  }

  if (!user || user.user_type !== UserType.ADMIN) {
    router.push('/')
  }

  return (
    user &&
    user.user_type === UserType.ADMIN && (
      <>
        <Navbar />
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{ backgroundImage: "url('/img/bg-landing.jpg')" }}
            >
              <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-7/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12 mt-10">
                    <h1 className="mt-4 text-7xl font-bold uppercase text-blueGray-200 md-hide">
                      Bayou Bowl III Competitors
                    </h1>
                    <h1 className="mt-4 text-6xl font-bold uppercase text-blueGray-200 md-show">BB III</h1>
                    <h1 className="mt-4 text-4xl font-bold uppercase text-blueGray-200 md-show">Competitors</h1>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: 'translateZ(0)' }}
            ></div>
          </div>

          <section id="rules" className="relative py-20 bg-blueGray-800">
            <div className="container mx-auto px-4">
              <div className="items-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {teamsLoading && <Spinner light={true} />}
                  {!teamsLoading &&
                    teams &&
                    teams
                      .sort(firstBy('name'))
                      .filter((t) => t.team_members.length)
                      .map((t) => (
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-check"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-200">
                              <strong>
                                <a href={'/team/' + t.id}>{t.name}</a>
                              </strong>
                            </h4>
                          </div>
                          <div>
                            <span className="text-xs font-semibold py-1 px-2 text-blueGray-200 mr-3">
                              <a href={`https://twitch.tv/${t.name}`} target="_blank" rel="noopenner noreferrer">
                                <i className="fab fa-twitch"></i>
                              </a>
                            </span>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  )
}
