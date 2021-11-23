import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { mutate } from 'swr'
import { firstBy } from 'thenby'
import Spinner from '../../components/PageChange/Spinner'
import Admin from '../../layouts/Admin'
import { fetcher, useEvent, useEvents } from '../../lib/swr'
import { Event } from '../../types/prisma'
import { routes } from '../../util/routes'
import Image from 'next/image'

function EventCard({ eventId }: { eventId: string }) {
  const { addToast, updateToast } = useToasts()
  const { event } = useEvent(eventId, { suspense: true })

  const resetScores = async () => {
    const answer = prompt(`Type '${event.name}' without quotes if you are sure you want to clear the scores for this event`)

    if (answer === event.name) {
      addToast(`Deleting event scores`, { appearance: 'info', autoDismiss: true }, async (toastId) => {
        await fetcher(`/api/event/${event.id}/scores`, { method: 'DELETE' })
        await mutate(routes.api.event.eventId.index(eventId))
        updateToast(toastId, {
          content: `Deleted all event scores successfully!`,
          appearance: 'success',
          autoDismiss: true,
        })
      })
    }

    else {
      alert("You entered the wrong name or canceled, nothing was done.")
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative h-auto align-middle -m-16 -ml-20 lg:-ml-16">
                <Image
                  alt="BB Event Card"
                  width={256}
                  height={144}
                  src={event.picture}
                  className="shadow-xl border-none"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20"></div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{event.name}</h3>
            <div className="mb-2 text-blueGray-600">Match Type: {event.match_type}</div>
            <div className="mb-2 text-blueGray-600">Total Scores: {event.scores.length}</div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <button
              data-event-id={event.id}
              onClick={() => {
                resetScores()
              }}
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Reset Scores
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const AdminEvents = withPageAuthRequired(() => {
  const { events, isLoading } = useEvents()

  if (isLoading) {
    return <Spinner light={true} />
  }

  return (
    <>
      <div className="flex flex-wrap">
        <React.Suspense fallback={<Spinner light={true} />}>
          {events.filter(e => e.name.toLowerCase().endsWith('test')).sort(firstBy('startDate')).map((event) => (
            <div key={event.id} className="w-full lg:w-4/12 px-4">
              <EventCard eventId={event.id} />
            </div>
          ))}
        </React.Suspense>
      </div>
    </>
  )
})

AdminEvents['layout'] = Admin

export default AdminEvents
