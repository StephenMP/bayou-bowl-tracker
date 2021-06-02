import { EventScore } from '.prisma/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import Admin from "../../layouts/Admin";
import { loadEventSelector } from "../../state/selectors";
import { queryParamAsString } from '../../util/routes';

type MutateScoreEvent = {
    eventType: 'add' | 'delete',
    score: EventScore
}

type TeamScore = {
    teamId: string,
    teamName: string,
    kills: number,
    bounties: number,
    totalScore: number
}

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

function Page({ eventId }: { eventId: string }) {
    const currentEvent = useRecoilValue(loadEventSelector(eventId))
    const [teamScores, setTeamScores] = useState<TeamScore[]>([])

    // useSocket('event-score', (event: MutateScoreEvent) => {
    //     const allTeamScores = teamScores.map(ts => ts)
    //     let teamScoreIndex = allTeamScores.findIndex(t => t.teamId === event.score.team_id)
    //     let teamScore = allTeamScores.find(t => t.teamId === event.score.team_id)

    //     if (event.eventType === 'add') {
    //         if (teamScore) {
    //             teamScore.bounties += event.score.bounties
    //             teamScore.kills += event.score.kills
    //             teamScore.totalScore = calculateBountyScore(teamScore.bounties) + calculateKillScore(teamScore.kills)
    //             allTeamScores.splice(teamScoreIndex, 1)
    //             allTeamScores.push(teamScore)
    //         }

    //         else {
    //             teamScore = {
    //                 bounties: event.score.bounties,
    //                 kills: event.score.kills,
    //                 teamName: currentEvent.teams.find(t => t.id === event.score.team_id).name,
    //                 totalScore: calculateBountyScore(event.score.bounties) + calculateKillScore(event.score.kills),
    //                 teamId: event.score.team_id
    //             }

    //             allTeamScores.push(teamScore)
    //         }
    //     }

    //     else {
    //         if (teamScore) {
    //             teamScore.bounties -= event.score.bounties
    //             teamScore.kills -= event.score.kills
    //             teamScore.totalScore = calculateBountyScore(teamScore.bounties) + calculateKillScore(teamScore.kills)
    //             allTeamScores.splice(teamScoreIndex, 1)
    //             allTeamScores.push(teamScore)
    //         }
    //     }

    //     setTeamScores(allTeamScores)
    // })

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4"></div>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-lg text-blueGray-700" >
                                    {currentEvent.name + ' Leaderboards'}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                        Team
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                        Kills
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                        Bounties
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                        Score
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamScores.sort((a, b) => b.totalScore - a.totalScore).map(score =>
                                    <tr key={score.teamId}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                            {/* <img
                                                src={user.picture}
                                                className="h-12 w-12 bg-white rounded-full border"
                                                alt="..."
                                            ></img>{" "} */}
                                            <span
                                                className="ml-3 font-bold text-blueGray-600">
                                                {score.teamName}
                                            </span>
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {score.kills}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {score.bounties}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {score.totalScore}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const EventPage = withPageAuthRequired(() => {
    const router = useRouter()
    const eventId = queryParamAsString(router.query.eventId)

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Page eventId={eventId} />
        </React.Suspense>
    )
})

EventPage['layout'] = Admin;
export default EventPage