import { TeamMemberType } from '@prisma/client'
import PropTypes from 'prop-types'
import React, { Suspense, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { firstBy } from 'thenby'
import { fetcher, useAllTeams } from '../../lib/swr'
import { useAllUsers } from '../../lib/swr/users'
import { Team, User } from '../../types/prisma'
import { routes } from '../../util/routes'
import { sortIgnoreCase } from '../../util/string'
import Spinner from '../PageChange/Spinner'

function getName(user: User) {
  return user.profile?.steam_name ?? `${user.name}*`
}

function AllTeams({ color }) {
  const { users, isLoading: usersLoading } = useAllUsers({ suspense: false })
  const { teams: allTeams, isLoading, mutate: mutateTeams } = useAllTeams({ suspense: false })
  const [canDelete, setCanDelete] = useState<boolean>(true)
  const { addToast, updateToast } = useToasts()

  const getTeamMembers = (team: Team) => {
    const members = team.team_members.filter((t) => t.member_type === TeamMemberType.MEMBER)
    return members
      .map((m) => {
        const user = users.find((u) => u.id === m.user_id)
        return user?.profile?.steam_name ?? user.name
      })
      .join(', ')
  }

  const getCaptain = (team: Team) => {
    const user = users.find(
      (u) => u.id === team.team_members.find((t) => t.member_type === TeamMemberType.CAPTAIN)?.user_id
    )
    if (user) {
      return user.profile?.steam_name ?? user.name
    }

    return null
  }

  const banTeam = async (team: Team) => {
    addToast('Banning team...', { appearance: 'info', autoDismiss: true }, async (toastId) => {
      setCanDelete(false)

      await fetcher(routes.api.team.teamId(team.id), {
        method: 'DELETE',
        body: JSON.stringify(team.id),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })

      updateToast(toastId, { content: 'Banned successfully!', appearance: 'success', autoDismiss: true })
      mutateTeams()

      setCanDelete(true)
    })
  }

  if (usersLoading || isLoading) {
    return <Spinner light={true} />
  }

  const teams = allTeams.filter((t) => t.event.name === 'Bayou Bowl III')
  return (
    <div
      className={
        'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
        (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className={'font-semibold text-lg ' + (color === 'light' ? 'text-blueGray-700' : 'text-white')}>
              Total Teams: {teams.length}
            </h3>
          </div>
          <div></div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
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
                Event
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                Team
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                Captain
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                }
              >
                Members
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.sort(firstBy((a, b) => sortIgnoreCase(a.name, b.name))).map((team) => (
              <tr key={team.id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {team.event.name}
                </td>
                <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <span className={'ml-3 font-bold ' + +(color === 'light' ? 'text-blueGray-600' : 'text-white')}>
                    {team.name}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {getCaptain(team)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {getTeamMembers(team)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button disabled={!canDelete} onClick={() => banTeam(team)}>
                    <i className={canDelete ? 'fas fa-trash-alt' : 'fas fa-spinner fa-spin'}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function CardTeamsTable({ color }) {
  return (
    <Suspense fallback={<div></div>}>
      <AllTeams color={color} />
    </Suspense>
  )
}

CardTeamsTable.defaultProps = {
  color: 'light',
}

CardTeamsTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
}
