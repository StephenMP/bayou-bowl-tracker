import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { firstBy } from 'thenby'
import Spinner from '../../../components/PageChange/Spinner'
import { useEvent } from '../../../lib/swr'
import { EventScoreByTeam, useEventScoreForEventByTeam } from '../../../lib/swr/event-score'
import { isCurrentlyDST } from '../../../util/dates'
import { queryParamAsString } from '../../../util/routes'
import { truncate } from '../../../util/string'

function calculateBountyScore(totalBounties: number) {
  let bountyScore = 0
  let tempTotalBounties = totalBounties
  while (tempTotalBounties > 2) {
    bountyScore += 1
    tempTotalBounties--
  }

  bountyScore += tempTotalBounties * 3
  return bountyScore
}

function calculateKillScore(totalKills: number) {
  return totalKills
}

function calculateScore(eventScore: EventScoreByTeam) {
  return calculateKillScore(eventScore.kills) + calculateBountyScore(eventScore.bounties)
}

type PageProps = {
  eventId: string
  skip: number
  take: number
}

function Page({ eventId, skip, take }: PageProps) {
  const { event, isLoading: eventIsLoading } = useEvent(eventId)
  const { eventScoresByTeam, isLoading: scoresAreLoading } = useEventScoreForEventByTeam(eventId, {
    refreshInterval: 5000,
  })

  if (eventIsLoading || scoresAreLoading) {
    return <Spinner light={false} />
  }

  const sortedEventScoresByTeam = eventScoresByTeam
    ?.sort(
      firstBy('totalScore', 'desc')
        .thenBy('totalHuntDollars', 'desc')
        .thenBy('totalSurvives', 'desc')
        .thenBy('totalRounds')
    )
    .slice(skip, skip + take)

  return (
    <div className="flex flex-wrap font-bold text-4xl text-font-mnh">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              {/* <h3 className="font-semibold text-lg text-blueGray-200 text-center">
                {`${event.name} Top ${take} Teams`}
              </h3> */}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse bg-blueGray-700">
            <thead>
              <tr>
                <th className="px-3 align-middle border border-solid py-1 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                  Place
                </th>
                <th className="px-3 align-middle border border-solid py-1 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                  Team
                </th>
                <th className="px-3 align-middle border border-solid py-1 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                  Money
                </th>
                <th className="px-3 align-middle border border-solid py-1 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                  Survived
                </th>
                <th className="px-3 align-middle border border-solid py-1 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                  Games
                </th>
                <th className="px-3 align-middle border border-solid py-1 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEventScoresByTeam.map((score, index) => (
                <tr key={score.teamId}>
                  <td className="border-t-0 px-3 align-middle text-md text-blueGray-200 border-l-0 border-r-0 whitespace-nowrap p-2">
                    {index + 1 + skip}
                  </td>
                  <td className="border-t-0 px-3 align-middle text-md text-blueGray-200 border-l-0 border-r-0 whitespace-nowrap p-2">
                    {truncate(score.teamName, 18)}
                  </td>
                  <td className="border-t-0 px-3 align-middle text-md text-blueGray-200 border-l-0 border-r-0 whitespace-nowrap p-2">
                    ${score.totalHuntDollars}
                  </td>
                  <td className="border-t-0 px-3 align-middle text-md text-blueGray-200 border-l-0 border-r-0 whitespace-nowrap p-2">
                    {score.totalSurvives}
                  </td>
                  <td className="border-t-0 px-3 align-middle text-md text-blueGray-200 border-l-0 border-r-0 whitespace-nowrap p-2">
                    {score.totalRounds}
                  </td>
                  <td className="border-t-0 px-3 align-middle text-md text-blueGray-200 border-l-0 border-r-0 whitespace-nowrap p-2">
                    {score.totalScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const EventPage = () => {
  const router = useRouter()
  const eventId = queryParamAsString(router.query.eventId)
  let skip = parseInt(queryParamAsString(router.query.skip) ?? '1')
  let take = parseInt(queryParamAsString(router.query.take) ?? '10')
  skip = skip === 0 ? 1 : skip
  take = take === 0 ? 10 : take

  useEffect(() => {
    document.body.classList.remove('bg-blueGray-200')
    document.body.classList.add('bg-none')
    document.getElementById('rcc-confirm-button')?.click()
  })

  return (
    <div className="flex justify-center">
      <Page eventId={eventId} skip={skip - 1} take={take} />
    </div>
  )
}

export default EventPage
