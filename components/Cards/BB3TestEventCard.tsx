import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useCurrentUserTeams } from '../../lib/swr/user'
import { Event, Team } from '../../types/prisma'
import { parseTimeFromDate } from '../../util/dates'
import Spinner from '../PageChange/Spinner'

function GoToEventPage({ eventId }: { eventId: string }) {
  return (
    <Link href={`/user/event/bb3/${eventId}`}>
      <button className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
        Go To Event Page
      </button>
    </Link>
  )
}

function CardButtons({ teams, eventId }: { teams: Team[]; eventId: string }) {
  const isRegistered = teams.find((ut) => ut.event_id === eventId)
  if (isRegistered) {
    return (
      <>
        <GoToEventPage eventId={eventId} />
      </>
    )
  }

  return (
    <>
      You do not have a Twitch name currently set up. Please set up your Twitch name, then contact support to get
      registered for the test event
    </>
  )
}

export default function BB3TestEventCard({ event }: { event: Event }) {
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
                    alt="BB3 Test Event Card"
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
              <CardButtons teams={teams} eventId={event.id} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
