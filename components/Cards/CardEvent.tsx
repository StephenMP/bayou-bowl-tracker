import React from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { useRouter } from 'next/router'
import { Event, Team } from "@prisma/client"
import { useRecoilValue } from "recoil";
import { userTeamsState } from "../../state/atoms";

export default function CardEvent({ event }: { event: (Event & { teams: Team[] }) }) {
  const router = useRouter();
  const userTeams = useRecoilValue(userTeamsState)
  const isRegistered = userTeams.find(ut => ut.event_id === event.id)

  const registerForEvent = (e) => {
    const eventId = e.currentTarget.dataset.eventId;
    router.push(`/user/event/register/${eventId}`)
  }

  const goToEventPage = (e) => {
    const eventId = e.currentTarget.dataset.eventId;
    router.push(`/user/event/${eventId}`)
  }

  const Register = ({eventId}: {eventId: string}) => {
    return (
      <button
        data-event-id={eventId}
        onClick={registerForEvent}
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Register
      </button>
    )
  }

  const GoToEventPage = ({eventId}: {eventId: string}) => {
    return (
      <button
        data-event-id={eventId}
        onClick={goToEventPage}
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Go To Event Page
      </button>
    )
  }

  const { user, error, isLoading } = useUser();
  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && <>
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
            {isRegistered ? <GoToEventPage eventId={event.id} /> : <Register eventId={event.id} />}
          </div>
        </div>
      </div>
    </>
  );
}
