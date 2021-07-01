import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from "react"
import { useToasts } from 'react-toast-notifications'
import { mutate } from 'swr'
import { firstBy } from 'thenby'
import Spinner from '../../components/PageChange/Spinner'
import Admin from "../../layouts/Admin"
import { fetcher, useEvent, useEvents } from "../../lib/swr"
import { Event } from "../../types/prisma"
import { routes } from '../../util/routes'

function EventCard({ eventId }: { eventId: string }) {
  const { addToast, updateToast } = useToasts()
  const { event } = useEvent(eventId, { suspense: true })

  const mutateEvent = async (action: 'start' | 'stop') => {
    addToast(`${action === 'start' ? 'Starting' : 'Stopping'} event...`, { appearance: 'info', autoDismiss: true }, async toastId => {
      mutate(routes.api.event.eventId.index(eventId), (data: Event) => {
        const newData = { ...data }
        newData.isActive = action === 'start'
        return newData
      }, false)

      await fetcher(routes.api.event.eventId.toggleActive(eventId, action))

      updateToast(toastId, { content: `${action === 'start' ? 'Started' : 'Stopped'} event successfully!`, appearance: 'success', autoDismiss: true });
      mutate(routes.api.event.eventId.index(eventId))
    })
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
            <a href={routes.rules} target="_blank" className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
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
      <Spinner light={true} />
    )
  }

  return (
    <>
      <div className="flex flex-wrap">
        <React.Suspense fallback={<Spinner light={true} />}>
        {events.sort(firstBy('startDate')).map((event) =>
            <div className="w-full lg:w-4/12 px-4">
              <EventCard key={event.id} eventId={event.id} />
            </div>
          )}
        </React.Suspense>
      </div>
    </>
  );
})

AdminEvents['layout'] = Admin;

export default AdminEvents