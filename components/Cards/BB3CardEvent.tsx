import { UserType } from '.prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'
import { AddToast, useToasts } from 'react-toast-notifications'
import { mutate } from 'swr'
import { fetcher } from '../../lib/swr'
import { useCurrentUser, useCurrentUserTeams } from '../../lib/swr/user'
import { Event, Team, User } from '../../types/prisma'
import { parseTimeFromDate } from '../../util/dates'
import { routes } from '../../util/routes'
import Spinner from '../PageChange/Spinner'
import Image from 'next/image'

async function registerForEvent(
  user: User,
  eventId: string,
  isRegistering: boolean,
  setRegistering: React.Dispatch<React.SetStateAction<boolean>>,
  addToast: AddToast
) {
  const now = new Date()
  const oct30 = new Date('2021-10-30T00:00:00.000Z')
  const nov20 = new Date('2021-11-20T23:59:59.000Z')
  try {
    if (now < oct30 && user.user_type !== UserType.ADMIN) {
      alert('Registration for The Bayou Bowl III will not be open until 30 Oct 2021 :)')
    } else if (now > nov20 && user.user_type !== UserType.ADMIN) {
      alert('Registration for The Bayou Bowl III has closed :(')
    } else {
      setRegistering(true)
      const response = await fetcher(`/api/event/register`, {
        method: isRegistering ? 'POST' : 'DELETE',
        body: JSON.stringify({ eventId }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })

      if (response && response.error) {
        alert(response.error)
      }

      addToast(`Successfully ${isRegistering ? 'registered' : 'unregistered'}`, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
  } catch (e) {
    addToast('There was an error, please contact support', { appearance: 'error', autoDismiss: false })
  } finally {
    await mutate(routes.api.user.teams)
  }
}

function GoToEventPage({ eventId }: { eventId: string }) {
  return (
    <Link href={`/user/bb3/${eventId}`}>
      <button className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
        Go To Event Page
      </button>
    </Link>
  )
}

function Register({ eventId, isRegister }: { eventId: string; isRegister: boolean }) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { addToast } = useToasts()
  const { user } = useCurrentUser()

  if (isLoading) {
    return (
      <button className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
        <i className="fas fa-spinner animate-spin mx-auto text-white"></i>
      </button>
    )
  }

  return (
    <button
      className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      onClick={() => {
        if (isRegister) {
          registerForEvent(user, eventId, isRegister, setLoading, addToast)
        } else {
          registerForEvent(user, eventId, isRegister, setLoading, addToast)
        }
      }}
    >
      {isRegister ? 'Register*' : 'Unregister'}
    </button>
  )
}

function CardButtons({ teams, eventId }: { teams: Team[]; eventId: string }) {
  const isRegistered = teams.find((ut) => ut.event_id === eventId)
  if (isRegistered) {
    return (
      <>
        <GoToEventPage eventId={eventId} />
        <Register eventId={eventId} isRegister={false} />
      </>
    )
  }
  return <Register eventId={eventId} isRegister={true} />
}

export default function BB3CardEvent({ event }: { event: Event }) {
  const { teams } = useCurrentUserTeams({ suspense: true })
  const eventStart = new Date(event.startDate)
  const eventTime = parseTimeFromDate(eventStart)

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative h-auto align-middle absolute -m-16 -ml-20 lg:-ml-16">
                <div>
                  <Image
                    alt="BB3 Event Card"
                    width={256}
                    height={144}
                    src={event.picture}
                    className="shadow-xl border-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20"></div>
          </div>
          <div className="flex flex-wrap items-center mt-12">
            <h3 className="text-center text-xl w-full lg:w-12/12 font-semibold leading-normal mb-2 text-blueGray-700 mb-5">
              {event.name}
            </h3>
            <div className="w-full lg:w-6/12">
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-calendar-alt mr-2 text-lg text-blueGray-400"></i>
                {`${eventStart.toLocaleDateString()}`}
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-clock mr-2 text-lg text-blueGray-400"></i>
                {eventTime}
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-sitemap mr-2 text-lg text-blueGray-400"></i>
                Match Type: {event.match_type}
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-users mr-2 text-lg text-blueGray-400"></i>
                Registered Teams: {event.teams.length}
              </div>
            </div>
            <div className="w-full lg:w-12/12">
              <a
                href="/pdf/Bayou_Bowl_III_Rules.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
              >
                Official Rules <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i>
              </a>
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <React.Suspense fallback={<Spinner light={true} />}>
              {/* <a href={routes.leaderboard.eventId(event.id)} target='_blank'>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Leaderboards
                </button>
              </a> */}
              <CardButtons teams={teams} eventId={event.id} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
