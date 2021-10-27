import { useRouter } from 'next/router';
import React from "react";
import { firstBy } from 'thenby';
import Footer from '../../components/Footers/Footer';
import Navbar from '../../components/Navbars/AuthNavbar';
import Spinner from '../../components/PageChange/Spinner';
import { useEvent } from '../../lib/swr';
import { EventScoreByTeam, useEventScoreForEventByTeam } from '../../lib/swr/event-score';
import { queryParamAsString } from '../../util/routes';

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

function Page({ eventId }: { eventId: string }) {
    const { eventScoresByTeam, isLoading } = useEventScoreForEventByTeam(eventId, { suspense: false, refreshInterval: 60 })

    if (isLoading) {
        return (<Spinner light={true} />)
    }

    return (
        <div className="flex flex-wrap w-full mt-4 mr-3 ml-3">
            <div className="w-full mb-12 px-4"></div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white" >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-md text-blueGray-600 text-center" >
                                Scores are automatically updated
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
                                    Place
                                </th>
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
                                    Games Played
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventScoresByTeam?.sort(firstBy('totalScore', 'desc').thenBy('totalRounds').thenBy('kills', 'desc').thenBy('bounties', 'desc')).map((score, index) =>
                                <tr key={score.teamId}>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {index + 1}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <strong>
                                            <a href={`/team/${score.teamId}`} target='_blank'>
                                                {score.teamName} <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i>
                                            </a>
                                        </strong>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.kills}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.bounties}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {score.totalRounds}
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
        </div >
    )
}

const EventPage = () => {
    const router = useRouter()
    const eventId = queryParamAsString(router.query.eventId)
    const { event, isLoading } = useEvent(eventId)

    if (isLoading) {
        return (<Spinner light={true} />)
    }

    return (
        <>
            <Navbar />
            <main>
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: "url('/img/bg-landing.jpg')" }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12 mt-10">
                                    <h1 className="mt-4 text-8xl uppercase font-bold text-blueGray-200">
                                        {event.name} Leaderboards
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
                        style={{ transform: "translateZ(0)" }}
                    >
                    </div>
                </div>

                <section id="news" className="pb-20 bg-blueGray-200 -mt-24">
                    <div className="flex justify-center">
                        <Page eventId={eventId} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default EventPage