import Link from 'next/link';
import { useRouter } from 'next/router';
import React from "react";
import { useCurrentUserTeams } from "../../lib/swr/user";
import { Event } from '../../types/prisma';
import { routes } from '../../util/routes';
import Spinner from '../PageChange/Spinner';

function navigate(route: string) {
  const router = useRouter()
  router.push(route)
}

function GoToEventPage({ eventId }: { eventId: string }) {
  return (
    <Link href={`/user/event/${eventId}`} >
      <button
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Go To Event Page
      </button>
    </Link>
  )
}

function Register({ eventId }: { eventId: string }) {
  return (
    <Link href={`/user/event/register/${eventId}`} >
      <button
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Register
      </button>
    </Link>
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

export default function CardEvent({ event }: { event: Event }) {
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
              <a href={routes.rules} target="_blank" className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                Official Rules <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i>
              </a>
            </div>
            <div className="w-full lg:w-12/12">
              <a href={routes.instructions} target="_blank" className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                Instructions to Compete <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i>
              </a>
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <React.Suspense fallback={<Spinner light={true} />}>
              {teams.find(ut => ut.event_id === event.id) ? <GoToEventPage eventId={event.id} /> : <></>}
              <a href={routes.leaderboard.eventId(event.id)} target='_blank'>
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Leaderboards
                </button>
              </a>
              {/* {teams.find(ut => ut.event_id === event.id) ? <GoToEventPage eventId={event.id} /> : <Register eventId={event.id} />} */}
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
