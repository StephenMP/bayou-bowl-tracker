import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from "react";
import { mutate } from 'swr';
import Admin from "../../layouts/Admin";
import { fetcher, useEvent, useEvents } from "../../lib/swr";
import { Event } from "../../types/prisma";

function EventCard({ eventId }: { eventId: string }) {
  const { event } = useEvent(eventId, { suspense: true })

  const mutateEvent = async (action: 'start' | 'stop') => {
    mutate(`/api/event/${eventId}`, (data: Event) => {
      const newData = { ...data }
      newData.isActive = action === 'start'
      return newData
    }, false)

    await fetcher(`/api/event/${eventId}/${action}`)

    mutate(`/api/event/${eventId}`)
  }

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
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {event.name}
            </h3>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-calendar-alt mr-2 text-lg text-blueGray-400"></i>
              {new Date(event.startDate).toLocaleDateString()}
            </div>
            <div className="mb-2 text-blueGray-600">
              Match Type: {event.match_type}
            </div>
            <div className="mb-2 text-blueGray-600">
              Registered Teams: {event.teams.length}
            </div>
            <a href="/rules" target="_blank" className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              Official Rules
            </a>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <button
              data-event-id={event.id}
              onClick={() => {
                const action = event.isActive ? 'stop' : 'start'
                mutateEvent(action)
              }}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              {event.isActive ? 'Stop Event' : 'Start Event'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const AdminEvents = withPageAuthRequired(() => {
  const { events, isLoading } = useEvents()

  console.log('rerender')

  if (isLoading) {
    return (
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">
          Loading...
      </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">
          <React.Suspense fallback={<div>Loading...</div>}>
            {events.map((event) =>
              <EventCard key={event.id} eventId={event.id} />
            )}
          </React.Suspense>
        </div>
      </div>
    </>
  );
})

AdminEvents['layout'] = Admin;

export default AdminEvents