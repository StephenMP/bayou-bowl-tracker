import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { TeamMember } from "@prisma/client";
import { useRouter } from 'next/router';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from 'recoil';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import useSocket from '../../../hooks/useSocket';
import Admin from "../../../layouts/Admin";
import { publishMessage } from '../../../lib/socketio-client';
import { userTeamsState } from "../../../state/atoms";
import { loadEventSelector, loadUserSelector } from "../../../state/selectors";
import { queryParamAsString } from '../../../util/routes';

type MemberScore = {
    userId: string,
    kills: number,
    bounties: number
}

type RoundScore = {
    round: number
    kills: number,
    bounties: number,
    total: number
}

function ScoreTable({ color, scoreState, socket }: { color: 'light' | 'dark', scoreState: [RoundScore[], Dispatch<SetStateAction<RoundScore[]>>], socket: Socket<DefaultEventsMap, DefaultEventsMap> }) {
    const [roundScores, setRoundScores] = scoreState

    const deleteRound = async (round: number) => {
        console.log(round)
        let scores = roundScores.map(rs => rs)

        if (round === 0) {
            scores.shift()
        }

        else {
            scores.splice(round, 1)
        }

        await publishMessage('event-score', scores)
    }

    return (
        <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " + (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")}>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Total Score: {roundScores.reduce((sum: number, curr: RoundScore) => sum + curr.total, 0)}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                            >
                                Round
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                            >
                                Kills
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                            >
                                Bounties
                            </th>
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                            >
                                Round Score
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {roundScores.map((score, index) =>
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {index + 1}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {score.kills}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {score.bounties}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {score.total}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <button
                                        data-id={index}
                                        onClick={() => deleteRound(index)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function UserScoreInput({ teamMember, memberScoreState }: { teamMember: TeamMember, memberScoreState: [MemberScore[], Dispatch<SetStateAction<MemberScore[]>>] }) {
    const [memberScore, setMemberScore] = memberScoreState
    const handleScoreChange = (e: ChangeEvent<HTMLInputElement>, scoreType: 'kills' | 'bounties') => {
        const roundScore = parseInt(e.target.value)
        const userScore = memberScore

        let currUserScore = userScore.find(u => u.userId === teamMember.user_id)
        if (currUserScore) {
            currUserScore[scoreType] = roundScore
        }

        else {
            currUserScore = {
                userId: teamMember.user_id,
                bounties: 0,
                kills: 0
            }
            currUserScore[scoreType] = roundScore
            userScore.push(currUserScore)
        }

        setMemberScore(userScore)
    }

    const user = useRecoilValue(loadUserSelector(teamMember.user_id))

    return (
        <>
            <div className="w-full lg:w-4/12 px-4">
                <div className="relative mt-6 w-full mb-3">
                    {user.name}
                </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                        Kills
                    </label>
                    <input id="teamName" type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => handleScoreChange(e, 'kills')}
                    />
                </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                        Bounties
                    </label>
                    <input id="logoUrl" type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={e => handleScoreChange(e, 'bounties')}
                    />
                </div>
            </div>
        </>
    )
}

function Page({ eventId }: { eventId: string }) {
    const currentEvent = useRecoilValue(loadEventSelector(eventId))
    const userTeams = useRecoilValue(userTeamsState)
    const userEventTeam = userTeams.find(ut => ut.event_id === currentEvent.id)
    const memberScoreState = useState<Array<MemberScore>>(new Array<MemberScore>())
    const roundScoresState = useState<Array<RoundScore>>([])
    const roundScores = roundScoresState[0]
    const setRoundScores = roundScoresState[1]

    const socket = useSocket('event-score', message => {
        setRoundScores(message)
    })

    const addScore = async (e) => {
        const killState: Array<MemberScore> = memberScoreState[0];
        const totalKills = killState.reduce((sum: number, curr: MemberScore) => sum + curr.kills, 0)

        let totalBounties = killState.reduce((sum: number, curr: MemberScore) => sum + curr.bounties, 0)
        let bountyScore = 0
        let tempTotalBounties = totalBounties
        while (tempTotalBounties > 2) {
            bountyScore += 1
            tempTotalBounties--
        }

        bountyScore += tempTotalBounties * 3

        const currRoundScores = roundScores.map(rs => rs)
        currRoundScores.push({
            bounties: totalBounties,
            kills: totalKills,
            round: currRoundScores.length,
            total: totalKills + bountyScore
        })

        await publishMessage('event-score', currRoundScores)
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words max-w-4xl mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            {userEventTeam ? userEventTeam.name : ''}
                        </h6>
                        <button
                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={addScore}
                        >
                            Add
                    </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Add Round Information
                    </h6>
                        <div className="flex flex-wrap">
                            <React.Suspense fallback={<div>Loading...</div>}>
                                {userEventTeam?.team_members.map(member => (
                                    <UserScoreInput key={member.user_id} teamMember={member} memberScoreState={memberScoreState} />
                                ))}
                            </React.Suspense>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-5 w-full">
                <ScoreTable color={'light'} scoreState={roundScoresState} socket={socket} />
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