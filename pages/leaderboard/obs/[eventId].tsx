import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { useEventScoreForEventByTeam } from '../../../lib/swr/event-score';
import { queryParamAsString } from '../../../util/routes';

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

type EventScoreByTeam = {
    teamName: string,
    teamId: string,
    kills: number,
    bounties: number
}

function Page({ eventId }: { eventId: string }) {
    // const currentEvent = useRecoilValue(loadEventSelector(eventId))
    const { eventScoresByTeam } = useEventScoreForEventByTeam(eventId, { suspense: false, refreshInterval: 10000 })

    return (
        <div className="flex flex-wrap max-w-5xl mt-4">
            <div className="w-full mb-12 px-4"></div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700" >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg text-blueGray-700" >
                                {/* {currentEvent.name + ' Leaderboards'} */}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse bg-blueGray-700">
                        <thead>
                            <tr>
                                <th className="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                                    Place
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                                    Team
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                                    Kills
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                                    Bounties
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                                    Games Played
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-700 text-blueGray-200 border-blueGray-100">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventScoresByTeam.sort((a, b) => b.totalScore - a.totalScore).map((score, index) =>
                                <tr key={score.teamId}>
                                    <td className="border-t-0 px-6 align-middle text-lg text-blueGray-200 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {index + 1}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle text-lg text-blueGray-200 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.teamName}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle text-lg text-blueGray-200 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.kills}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle text-lg text-blueGray-200 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.bounties}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle text-lg text-blueGray-200 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.totalRounds}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle text-lg text-blueGray-200 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.totalScore}
                                    </td>
                                </tr>
                            )}
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

    useEffect(() => {
        document.body.classList.remove('bg-blueGray-200')
        document.body.classList.add('bg-green')
    })

    return (
        <div className="flex justify-center">
            <Page eventId={eventId} />
        </div>
    )
}

export default EventPage