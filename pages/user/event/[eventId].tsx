import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { EventMatchType } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { useToasts } from 'react-toast-notifications';
import { mutate } from 'swr';
import { firstBy } from 'thenby';
import Spinner from '../../../components/PageChange/Spinner';
import Admin from "../../../layouts/Admin";
import { fetcher, useEvent, useUserTeamForEventAndUser } from '../../../lib/swr';
import { useEventScoreForTeam } from '../../../lib/swr/event-score';
import { useCurrentUser, useUser } from '../../../lib/swr/user';
import { EventScore, PlayerScore, TeamMember, TeamMemberType, TeamScore } from "../../../types/prisma";
import { queryParamAsString, routes } from '../../../util/routes';

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

function calculateScore(eventScore: EventScore) {
    const bounties = eventScore.team_score.bounties
    const kills = eventScore.player_scores.reduce((prev: number, curr: PlayerScore) => {
        return prev + curr.kills
    }, 0)

    return calculateKillScore(kills) + calculateBountyScore(bounties)
}

function calculateTotalScore(eventScores: EventScore[]) {
    return eventScores.reduce((total, eventScore) => {
        total += calculateScore(eventScore)
        return total
    }, 0)
}

function calculateTotalKills(eventScores: EventScore[]) {
    return eventScores.reduce((total, eventScore) => {
        total += eventScore.player_scores.reduce((totalKills, playerScore) => {
            totalKills += playerScore.kills
            return totalKills
        }, 0)
        return total
    }, 0)
}

function calculateTotalBounties(eventScores: EventScore[]) {
    return eventScores.reduce((total, eventScore) => {
        total += eventScore.team_score.bounties
        return total
    }, 0)
}

function ScoreTable({ color, teamId, canEdit, canDeleteState, canAddState }: { color: 'light' | 'dark', teamId: string, canEdit: boolean, canDeleteState: [boolean, Dispatch<SetStateAction<boolean>>], canAddState: [boolean, Dispatch<SetStateAction<boolean>>] }) {
    const { eventScores } = useEventScoreForTeam(teamId, { suspense: true })
    const { addToast, updateToast } = useToasts();
    const [canAdd, setCanAdd] = canAddState
    const [canDelete, setCanDelete] = canDeleteState

    const deleteRound = async (eventScore: EventScore) => {
        addToast('Deleting score...', { appearance: 'info', autoDismiss: true }, async toastId => {
            setCanAdd(false)
            setCanDelete(false)

            mutate(routes.api.event_scores.team.teamId(teamId), (data: EventScore[]) => {
                const newData = [...data]
                newData.pop()
                return newData
            }, false)

            await fetcher(routes.api.event_scores.index, {
                method: 'DELETE',
                body: JSON.stringify(eventScore),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })
            })

            updateToast(toastId, { content: 'Deleted successfully!', appearance: 'success', autoDismiss: true });
            mutate(routes.api.event_scores.team.teamId(teamId))

            setCanAdd(true)
            setCanDelete(true)
        })
    }

    return (
        <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " + (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")}>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full lg:w-3/12 px-4 max-w-full flex-grow flex-1">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Rounds: {eventScores.length}
                        </h3>
                    </div>
                    <div className="relative w-full lg:w-3/12 px-4 max-w-full flex-grow flex-1">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Kills: {calculateTotalKills(eventScores)}
                        </h3>
                    </div>
                    <div className="relative w-full lg:w-3/12 px-4 max-w-full flex-grow flex-1">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Bounties: {calculateTotalBounties(eventScores)}
                        </h3>
                    </div>
                    <div className="relative w-full lg:w-3/12 px-4 max-w-full flex-grow flex-1">
                        <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
                            Score: {calculateTotalScore(eventScores)}
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
                        {eventScores?.map((score, index) =>
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {index + 1}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {score.player_scores.reduce((prev: number, curr: PlayerScore) => {
                                        return prev + curr.kills
                                    }, 0)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {score.team_score.bounties}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {calculateScore(score)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    {index === eventScores.length - 1 ?
                                        <button
                                            data-id={index}
                                            disabled={!canDelete}
                                            hidden={!canEdit}
                                            onClick={() => deleteRound(score)}
                                        >
                                            <i className={canDelete ? "fas fa-trash-alt" : "fas fa-spinner fa-spin"}></i>
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

function UserScoreInput({ teamMember, formState }: { teamMember: TeamMember, formState: [AddScoreForm, Dispatch<SetStateAction<AddScoreForm>>] }) {
    const { user } = useUser(teamMember.user_id, { suspense: true })
    const [form, setForm] = formState

    const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value) {
            e.target.value = '0'
        }
        
        let newMemberKills = parseInt(e.target.value)
        let sum = 0

        const newForm: AddScoreForm = {
            ...form,
            killsByMember: {
                ...form.killsByMember,
                [teamMember.user_id]: newMemberKills
            }
        }

        for (var key in newForm.killsByMember) {
            sum += newForm.killsByMember[key]
        }

        if (sum > form.maxKills) {
            alert(`Total kills can not be larger than ${form.maxKills}`)
            newMemberKills = newMemberKills - 1 >= 0 ? newMemberKills - 1 : 0
            newForm.killsByMember[teamMember.user_id] = newMemberKills
            e.target.value = `${newMemberKills}`
        }

        setForm(newForm)
    }

    return (
        <>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative mt-6 w-full mb-3">
                    {user.name}
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                        Kills
                    </label>
                    <input id={teamMember.user_id + '-kills'} type="number" min={0} max={55} defaultValue={0} className="w-full" onChange={handleScoreChange} />
                </div>
            </div>
        </>
    )
}

type AddScoreForm = {
    bounties: number,
    maxKills: number,
    killsByMember: {
        [key: string]: number
    }
}

function Page({ eventId }: { eventId: string }) {
    const { user: currentUser } = useCurrentUser({ suspense: true })
    const { event } = useEvent(eventId, { suspense: true })
    const { team } = useUserTeamForEventAndUser(eventId, currentUser.id, { suspense: true })
    const { eventScores } = useEventScoreForTeam(team.id, { suspense: true })

    const maxKills: number = event.match_type === EventMatchType.TRIOS ? 45 : EventMatchType.SOLOS ? 55 : 50
    const addScoreFormState = useState<AddScoreForm>({ bounties: 0, killsByMember: {}, maxKills })
    const [addScoreForm, setScoreForm] = addScoreFormState
    const [canAdd, setCanAdd] = useState<boolean>(true)
    const [canDelete, setCanDelete] = useState<boolean>(true)

    const bountiesRef = useRef<HTMLSelectElement>()
    const memberType = team.team_members.find(tm => tm.user_id === currentUser.id).member_type
    const canEdit = memberType === 'CAPTAIN' || memberType === 'SCOREKEEPER'
    const { addToast, updateToast } = useToasts();

    const handleBountyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if(!e.target.value) {
            e.target.value = '0'
        }

        const newBounties = parseInt(e.target.value)
        if(newBounties > 4) {
            alert('Max bounties is 4')
            e.target.value = '0'
            return
        }

        const newForm: AddScoreForm = {
            bounties: newBounties,
            killsByMember: addScoreForm.killsByMember,
            maxKills,
        }

        setScoreForm(newForm)
    }

    const addScore = async () => {
        addToast('Adding score...', { appearance: 'info', autoDismiss: true }, async toastId => {
            setCanAdd(false)
            setCanDelete(false)

            const playerScores: PlayerScore[] = team.team_members.map(tm => {
                const userKills = addScoreForm.killsByMember[tm.user_id]
                return {
                    event_id: eventId,
                    kills: userKills ?? 0,
                    round_num: eventScores.length + 1,
                    team_id: team.id,
                    user_id: tm.user_id,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                }
            })

            const teamScore: TeamScore = {
                bounties: addScoreForm.bounties,
                event_id: eventId,
                round_num: eventScores.length + 1,
                team_id: team.id,
                createdDate: new Date(),
                updatedDate: new Date(),
            }

            const eventScore: EventScore = {
                event_id: eventId,
                round_num: eventScores.length + 1,
                team_id: team.id,
                createdDate: new Date(),
                updatedDate: new Date(),
                player_scores: playerScores,
                team_score: teamScore
            }

            // Mutate SWR without revalidate
            const newEventScores = eventScores.map(es => es)
            newEventScores.push(eventScore)
            mutate(routes.api.event_scores.team.teamId(team.id), (data: EventScore[]) => {
                const newData = [...data]
                newData.push(eventScore)
                return newData
            }, false)

            // Update data
            await fetcher(routes.api.event_scores.index, {
                method: 'POST',
                body: JSON.stringify(eventScore),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })
            })

            // Mutate SWR with a revalidate
            updateToast(toastId, { content: 'Added score successfully!', appearance: 'success', autoDismiss: true });
            mutate(routes.api.event_scores.team.teamId(team.id))

            // Set states
            setCanAdd(true)
            setCanDelete(true)
            setScoreForm({ bounties: 0, maxKills, killsByMember: {} })

            // Clear form
            bountiesRef.current.value = '0'
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "0")
            );
        })
    }

    const calculateRoundScore = () => {
        const bountyScore = calculateBountyScore(addScoreFormState[0].bounties)
        let killScore = 0
        for (var key in addScoreFormState[0].killsByMember) {
            killScore += calculateKillScore(addScoreFormState[0].killsByMember[key])
        }

        return killScore + bountyScore
    }

    const teamMemberType = team?.team_members.find(tm => tm.user_id === currentUser.id)?.member_type
    const isAllowedToEditScores = teamMemberType === TeamMemberType.CAPTAIN || teamMemberType === TeamMemberType.SCOREKEEPER
    let result: JSX.Element = (<></>)

    if (!event.isActive) {
        result = (
            <div className="relative max-w-4xl mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            Event starts 17 July, 2021 at Noon EST
                        </h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        When the event becomes active, this page will auto-refresh and allow
                        you to begin adding scores. If you don't see the page auto-refresh,
                        try clicking the page. If that does not work, please manually refresh.
                    </h6>
                </div>
            </div>
        )
    }

    else if (isAllowedToEditScores && event.isActive) {
        result = (
            <div className="relative max-w-4xl mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            {team ? team.name : ''}
                        </h6>
                        <button
                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            disabled={!canAdd}
                            onClick={addScore}
                        >
                            {canAdd ? `Add ${calculateRoundScore()} Points` : <i className="fas fa-spinner fa-spin"></i>}
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <React.Suspense fallback={<Spinner light={false} />}>
                        <form>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Add Round Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative mt-6 w-full mb-3">
                                        Team
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" >
                                            Bounties
                                        </label>
                                        <select name="bounties" id="bounties" className="w-full" ref={bountiesRef} onChange={handleBountyChange} >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                                {team?.team_members.filter(member => member.member_type !== TeamMemberType.SCOREKEEPER).sort(firstBy('user_id')).map(member => (
                                    <UserScoreInput key={member.user_id} teamMember={member} formState={addScoreFormState} />
                                ))}
                            </div>
                        </form>
                    </React.Suspense>
                </div>
            </div>
        )
    }

    return (
        <React.Suspense fallback={<Spinner light={true} />}>
            <div className="flex justify-center">
                {result}
            </div>
            {event.isActive ?
                <div className="mt-5 w-full">
                    <React.Suspense fallback={<Spinner light={true} />}>
                        <ScoreTable color={'light'} teamId={team.id} canEdit={canEdit} canDeleteState={[canDelete, setCanDelete]} canAddState={[canAdd, setCanAdd]} />
                    </React.Suspense>
                </div> : <></>}
        </React.Suspense>
    )
}

const EventPage = withPageAuthRequired(() => {
    const router = useRouter()
    const eventId = queryParamAsString(router.query.eventId)

    return (
        <React.Suspense fallback={<Spinner light={true} />}>
            <Page eventId={eventId} />
        </React.Suspense>
    )
})

EventPage['layout'] = Admin;
export default EventPage