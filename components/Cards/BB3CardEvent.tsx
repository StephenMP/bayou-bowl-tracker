import Link from 'next/link';
import React, { useState } from "react";
import { AddToast, useToasts } from 'react-toast-notifications';
import { mutate } from 'swr';
import { fetcher } from '../../lib/swr';
import { useCurrentUserTeams } from "../../lib/swr/user";
import { Event, Team } from '../../types/prisma';
import { routes } from '../../util/routes';
import Spinner from '../PageChange/Spinner';

async function registerForEvent(eventId: string, isRegistering: boolean, setRegistering: React.Dispatch<React.SetStateAction<boolean>>, addToast: AddToast) {
  try {
    setRegistering(true)
    const response = await fetcher(`/api/event/register`, {
      method: isRegistering ? 'POST' : 'DELETE',
      body: JSON.stringify({ eventId }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })

    if (response && response.error) {
      alert(response.error)
    }

    addToast(`Successfully ${isRegistering ? "registered" : "unregistered"}`, { appearance: 'success', autoDismiss: true })
    await mutate(routes.api.user.teams)
  }
  catch (e) {
    addToast('There was an error, please contact support', { appearance: 'error', autoDismiss: false })
  }
}

function GoToEventPage({ eventId }: { eventId: string }) {
  return (
    <Link href={`/user/bb3/${eventId}`} >
      <button
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Go To Event Page
      </button>
    </Link>
  )
}

function Register({ eventId, isRegister }: { eventId: string, isRegister: boolean }) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { addToast } = useToasts();

  if (isLoading) {
    return (
      <button
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        <i className="fas fa-spinner animate-spin mx-auto text-white"></i>
      </button>
    )
  }

  return (
    <button
      className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      onClick={() => {
        if (isRegister) {
          registerForEvent(eventId, isRegister, setLoading, addToast)
        }
        else {
          registerForEvent(eventId, isRegister, setLoading, addToast)
        }
      }}
    >
      {isRegister ? 'Register' : 'Unregister'}
    </button>
  )
}

function parseTimeFromDate(date: Date) {
  let hour = date.getHours()
  const amPm = hour >= 12 ? 'pm' : 'am'
  let min: string | number = date.getMinutes()

  hour = hour % 12;
  hour = hour ? hour : 12
  min = min < 10 ? '0' + min : min

  return `${hour}:${min} ${amPm} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
}

function CardButtons({ teams, eventId }: { teams: Team[], eventId: string }) {
  const isRegistered = teams.find(ut => ut.event_id === eventId)
  if (isRegistered) {
    return (
      <>
        <GoToEventPage eventId={eventId} />
        <Register eventId={eventId} isRegister={false} />
      </>
    )
  }
  return (
    <Register eventId={eventId} isRegister={true} />
  )
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
              <div className="relative">
                <img
                  alt="..."
                  height={150}
                  width={150}
                  src={event.picture}
                  className="shadow-xl h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
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
              <a href='/pdf/Bayou_Bowl_III_Rules_V1-1.pdf' target="_blank" className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
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
  );
}
