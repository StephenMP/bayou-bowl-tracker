import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { EventScore, TeamMember, TeamMemberType } from "@prisma/client";
import { useRouter } from 'next/router';
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { useRecoilValue } from 'recoil';
import useSocket from '../../../hooks/useSocket';
import Admin from "../../../layouts/Admin";
import { publishEvent } from '../../../lib/socketio-client';
import { userState, userTeamsState } from "../../../state/atoms";
import { loadEventSelector, loadUserSelector } from "../../../state/selectors";
import { queryParamAsString } from '../../../util/routes';

type MutateScoreEvent = {
    eventType: 'add' | 'delete',
    score: EventScore
}

type MemberScore = {
    userId: string,
    kills: number,
    bounties: number
}

type RoundScore = {
    total: number
} & EventScore

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

function ScoreTable({ color, roundScores }: { color: 'light' | 'dark', roundScores: RoundScore[] }) {
    const deleteRound = async (score: RoundScore) => {
        const message: MutateScoreEvent = {
            eventType: 'delete',
            score: score
        }

        await publishEvent('event-score', message)
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
                            <th
                                className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right " +
                                    (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                }
                            >
                                {''}
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
                                    {index === roundScores.length - 1 ?
                                        <button
                                            data-id={index}
                                            onClick={() => deleteRound(score)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        : <></>}
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
    const [teamMemberScore, setTeamMemberScore] = memberScoreState
    const killRef = useRef<HTMLInputElement>()
    const bountyRef = useRef<HTMLInputElement>()

    const handleScoreChange = (e: ChangeEvent<HTMLInputElement>, scoreType: 'kills' | 'bounties') => {
        const scoreForTheRound = parseInt(e.target.value)
        const userScore = teamMemberScore

        let currUserScore = userScore.find(u => u.userId === teamMember.user_id)
        if (currUserScore) {
            currUserScore[scoreType] = scoreForTheRound
        }

        else {
            currUserScore = {
                userId: teamMember.user_id,
                bounties: 0,
                kills: 0
            }
            currUserScore[scoreType] = scoreForTheRound
            userScore.push(currUserScore)
        }

        setTeamMemberScore(userScore)
    }

    const user = useRecoilValue(loadUserSelector(teamMember.user_id))

    useSocket('event-score', () => {
        killRef.current.value = ''
        bountyRef.current.value = ''
    })

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
                    <input id={teamMember.user_id + '-kills'} type="number" ref={killRef}
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
                    <input id={teamMember.user_id + '-bounties'} type="number" ref={bountyRef}
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
    const currentUser = useRecoilValue(userState)
    const userTeams = useRecoilValue(userTeamsState)
    const userEventTeam = userTeams.find(ut => ut.event_id === currentEvent.id)

    const teamMemberScoreState = useState<MemberScore[]>([])
    const roundScoresState = useState<RoundScore[]>([])
    const roundScores = roundScoresState[0]
    const setRoundScores = roundScoresState[1]

    useSocket('event-score', (message: MutateScoreEvent) => {
        const scores = roundScores.map(rs => rs)

        if (message.eventType === 'add') {
            let score = scores[message.score.round_num]
            if (score) {
                score.bounties += message.score.bounties
                score.kills += message.score.kills
                score.total = calculateBountyScore(score.bounties) + calculateKillScore(score.kills)
                scores.splice(message.score.round_num, 1)
                scores.push(score)
            }

            else {
                score = {
                    event_id: eventId,
                    team_id: userEventTeam.id,
                    user_id: currentUser.id,
                    bounties: message.score.bounties,
                    kills: message.score.kills,
                    round_num: message.score.round_num,
                    total: calculateBountyScore(message.score.bounties) + calculateKillScore(message.score.kills)
                }

                scores.push(score)
            }
        }

        else {
            if (message.score.round_num === 0) {
                scores.shift()
            }

            else {
                scores.splice(message.score.round_num, 1)
            }
        }

        setRoundScores(scores)
    })

    const addScore = async () => {
        const teamMemberScore: MemberScore[] = teamMemberScoreState[0];

        teamMemberScore.forEach(async score => {
            const event: MutateScoreEvent = {
                eventType: 'add',
                score: {
                    bounties: score.bounties,
                    event_id: eventId,
                    kills: score.kills,
                    round_num: roundScores.length,
                    team_id: userEventTeam.id,
                    user_id: currentUser.id
                }
            }

            await publishEvent('event-score', event)
        });
    }

    const teamMemberType = userEventTeam?.team_members.find(tm => tm.user_id === currentUser.id)?.member_type
    const isAllowedToEditScores = teamMemberType === TeamMemberType.CAPTAIN || teamMemberType === TeamMemberType.SCOREKEEPER
    let result: JSX.Element = (<></>)

    if (isAllowedToEditScores) {
        result = (
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
                                        <UserScoreInput key={member.user_id} teamMember={member} memberScoreState={teamMemberScoreState} />
                                    ))}
                                </React.Suspense>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {result}
            <div className="mt-5 w-full">
                <ScoreTable color={'light'} roundScores={roundScoresState[0]} />
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