import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { mutate } from 'swr'
import { firstBy } from 'thenby'
import ImageTooltipDropdown from '../../../../components/Dropdowns/ImageTooltipDropdown'
import Spinner from '../../../../components/PageChange/Spinner'
import Admin from '../../../../layouts/Admin'
import { fetcher, useEvent, useUserTeamForEventAndUser } from '../../../../lib/swr'
import { useEventScoreForTeam } from '../../../../lib/swr/event-score'
import { useCurrentUser } from '../../../../lib/swr/user'
import { EventScore, PlayerScore, TeamMemberType, TeamScore } from '../../../../types/prisma'
import { parseTimeFromDate } from '../../../../util/dates'
import { queryParamAsString, routes } from '../../../../util/routes'

function calculateMoneyScore(totalMoney: number) {
  return totalMoney
}

function calculateSoulSurvivorScore(soulSurvivor: boolean) {
  return soulSurvivor ? 50 : 0
}

function calculateScore(eventScore: EventScore) {
  return (
    calculateMoneyScore(eventScore.team_score.hunt_dollars) + calculateSoulSurvivorScore(eventScore.team_score.survived)
  )
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

function calculateTotalMoney(eventScores: EventScore[]) {
  return eventScores.reduce((total, eventScore) => {
    total += eventScore.team_score.hunt_dollars
    return total
  }, 0)
}

function ScoreTable({
  color,
  teamId,
  canEdit,
  canDeleteState,
  canAddState,
}: {
  color: 'light' | 'dark'
  teamId: string
  canEdit: boolean
  canDeleteState: [boolean, Dispatch<SetStateAction<boolean>>]
  canAddState: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
  const { eventScores } = useEventScoreForTeam(teamId, { suspense: true, revalidateOnFocus: false })
  const { addToast, updateToast } = useToasts()
  const [canAdd, setCanAdd] = canAddState
  const [canDelete, setCanDelete] = canDeleteState

  const deleteRound = async (eventScore: EventScore) => {
    addToast('Deleting score...', { appearance: 'info', autoDismiss: true }, async (toastId) => {
      setCanAdd(false)
      setCanDelete(false)

      mutate(
        routes.api.event_scores.team.teamId(teamId),
        (data: EventScore[]) => {
          const newData = [...data]
          return newData.slice(1, newData.length)
        },
        false
      )

      await fetcher(routes.api.event_scores.index, {
        method: 'DELETE',
        body: JSON.stringify(eventScore),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })

      updateToast(toastId, { content: 'Deleted successfully!', appearance: 'success', autoDismiss: true })
      mutate(routes.api.event_scores.team.teamId(teamId))

      setCanAdd(true)
      setCanDelete(true)
    })
  }

  return (
    <div
      className={
        'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
        (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative py-3 w-full w-6/12 md:w-3/12 px-4 max-w-full flex-grow flex-1">
            <h3
              className={'font-semibold text-xl font-bold ' + (color === 'light' ? 'text-blueGray-700' : 'text-white')}
            >
              Scores
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto max-h-screen-75">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                {`Round (${eventScores.length})`}
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                {`Money (${calculateTotalMoney(eventScores)})`}
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                {`Survived (${eventScores.reduce(
                  (prev: number, curr: EventScore) => (curr.team_score.survived ? prev + 1 : prev + 0),
                  0
                )})`}
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                {`Kills (${calculateTotalKills(eventScores)})`}
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                {`Round Score (${calculateTotalScore(eventScores)})`}
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                {''}
              </th>
            </tr>
          </thead>
          <tbody>
            {eventScores?.sort(firstBy('round_num', 'desc')).map((score, index) => (
              <tr key={score.round_num}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {score.round_num}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {score.team_score.hunt_dollars}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {score.team_score.survived ? <i className="fas fa-check" /> : <i className="fas fa-times" />}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {score.player_scores.reduce((prev: number, curr: PlayerScore) => {
                    return prev + curr.kills
                  }, 0)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {calculateScore(score)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {index === 0 ? (
                    <button data-id={index} disabled={!canDelete} hidden={!canEdit} onClick={() => deleteRound(score)}>
                      <i className={canDelete ? 'fas fa-trash-alt' : 'fas fa-spinner fa-spin'}></i>
                    </button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const defaultForm: AddScoreForm = {
  money: 0,
  kills: 0,
  survived: false,
}

type AddScoreForm = {
  money: number
  kills: number
  survived: boolean
}

function Page({ eventId }: { eventId: string }) {
  const { user: currentUser } = useCurrentUser({ suspense: true, revalidateOnFocus: false })
  const { event } = useEvent(eventId, { suspense: true })
  const { team } = useUserTeamForEventAndUser(eventId, currentUser.id, { suspense: true, revalidateOnFocus: false })
  const { eventScores } = useEventScoreForTeam(team.id, { suspense: true, revalidateOnFocus: false })
  const startDate = new Date(event.startDate)

  const maxMoney = 550
  const maxKills = 11
  const addScoreFormState = useState<AddScoreForm>(defaultForm)
  const [addScoreForm, setScoreForm] = addScoreFormState
  const [canAdd, setCanAdd] = useState<boolean>(true)
  const [canDelete, setCanDelete] = useState<boolean>(true)

  const moneyRef = useRef<HTMLSelectElement>()
  const memberType = team.team_members.find((tm) => tm.user_id === currentUser.id).member_type
  const canEdit = memberType === 'CAPTAIN' || memberType === 'SCOREKEEPER'
  const { addToast, updateToast } = useToasts()

  const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsNumber > maxMoney) {
      e.target.value = maxMoney.toString()
    }

    setScoreForm({
      ...addScoreForm,
      money: e.target.valueAsNumber || 0,
    })
  }

  const handleKillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScoreForm({
      ...addScoreForm,
      kills: e.target.valueAsNumber || 0,
    })
  }

  const handleSurvivorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScoreForm({
      ...addScoreForm,
      survived: e.target.checked,
    })
  }

  const addScore = async () => {
    addToast('Adding score...', { appearance: 'info', autoDismiss: true }, async (toastId) => {
      setCanAdd(false)
      setCanDelete(false)

      const playerScores: PlayerScore[] = team.team_members.map((tm) => {
        const userKills = addScoreForm.kills
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
        hunt_dollars: addScoreForm.money,
        event_id: eventId,
        round_num: eventScores.length + 1,
        team_id: team.id,
        createdDate: new Date(),
        updatedDate: new Date(),
        bounties: 0,
        survived: addScoreForm.survived,
      }

      const eventScore: EventScore = {
        event_id: eventId,
        round_num: eventScores.length + 1,
        team_id: team.id,
        createdDate: new Date(),
        updatedDate: new Date(),
        player_scores: playerScores,
        team_score: teamScore,
      }

      // Mutate SWR without revalidate
      const newEventScores = eventScores.map((es) => es)
      newEventScores.push(eventScore)
      mutate(
        routes.api.event_scores.team.teamId(team.id),
        (data: EventScore[]) => {
          const newData = [...data]
          newData.push(eventScore)
          return newData
        },
        false
      )

      // Update data
      await fetcher(routes.api.event_scores.index, {
        method: 'POST',
        body: JSON.stringify(eventScore),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })

      // Mutate SWR with a revalidate
      updateToast(toastId, { content: 'Added score successfully!', appearance: 'success', autoDismiss: true })
      mutate(routes.api.event_scores.team.teamId(team.id))

      // Set states
      setCanAdd(true)
      setCanDelete(true)
      setScoreForm(defaultForm)

      // Clear form
      //   moneyRef.current.value = '0'
      Array.from(document.querySelectorAll('input')).forEach((input) => {
        if (input.type === 'checkbox') {
          input.checked = false
        } else {
          input.value = ''
        }
      })
    })
  }

  const calculateRoundScore = () => {
    return calculateMoneyScore(addScoreFormState[0].money) + calculateSoulSurvivorScore(addScoreFormState[0].survived)
  }

  const teamMemberType = team?.team_members.find((tm) => tm.user_id === currentUser.id)?.member_type
  const isAllowedToEditScores =
    teamMemberType === TeamMemberType.CAPTAIN || teamMemberType === TeamMemberType.SCOREKEEPER
  let result: JSX.Element = <></>

  if (!event.isActive) {
    result = (
      <div className="relative max-w-4xl mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Event starts {`${startDate.toDateString()} at ${parseTimeFromDate(startDate)}`}
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            When the event becomes active, this page will auto-refresh and allow you to begin adding scores. If you
            don't see the page auto-refresh, try clicking the page. If that does not work, please manually refresh.
          </h6>
        </div>
      </div>
    )
  } else if (isAllowedToEditScores && event.isActive) {
    result = (
      <div className="relative mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{team ? team.name : ''}</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <React.Suspense fallback={<Spinner light={false} />}>
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Add Round Information</h6>
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      <ImageTooltipDropdown
                        text="Hunt Dollars Earned (Click for info):"
                        src="/img/tooltips/BB3_HuntDollars.png"
                        width={300}
                        height={169}
                      />
                    </label>
                    <input
                      id={currentUser.id + '-money'}
                      type="number"
                      min={0}
                      max={maxMoney}
                      defaultValue={''}
                      placeholder="0"
                      className="w-full"
                      onChange={handleMoneyChange}
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Kills (no points, only for stats)
                    </label>
                    <input
                      id={currentUser.id + '-kills'}
                      type="number"
                      min={0}
                      max={maxKills}
                      defaultValue={''}
                      placeholder="0"
                      className="w-full"
                      onChange={handleKillChange}
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <span className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      <ImageTooltipDropdown
                        text="Soul Survivor (Click for info):"
                        src="/img/tooltips/BB3_SoulSurvivors.png"
                        width={239}
                        height={305}
                      />
                      <input
                        id={currentUser.id + '-survivor'}
                        type="checkbox"
                        className="ml-1"
                        onChange={handleSurvivorChange}
                      />
                    </span>
                  </div>
                </div>
                <div className="w-full px-4">
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
            </form>
          </React.Suspense>
        </div>
      </div>
    )
  }

  return (
    <React.Suspense fallback={<Spinner light={true} />}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">{result}</div>
        {event.isActive ? (
          <div className="w-full lg:w-8/12 px-4">
            <React.Suspense fallback={<Spinner light={true} />}>
              <ScoreTable
                color={'light'}
                teamId={team.id}
                canEdit={canEdit}
                canDeleteState={[canDelete, setCanDelete]}
                canAddState={[canAdd, setCanAdd]}
              />
            </React.Suspense>
          </div>
        ) : (
          <></>
        )}
      </div>
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

EventPage['layout'] = Admin
export default EventPage
