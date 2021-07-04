import { TeamMemberType } from "@prisma/client";
import PropTypes from "prop-types";
import React, { Suspense } from "react";
import { useTeamsForEvent } from "../../lib/swr";
import { useAllUsers } from "../../lib/swr/users";
import Spinner from "../PageChange/Spinner";

function AllTeams({ color }) {
  const { users, isLoading: usersLoading } = useAllUsers({ suspense: false })
  const { teams, isLoading } = useTeamsForEvent('623e0a1f-59a5-4d91-9edd-e20caf442ec5', { suspense: false })

  if (usersLoading || isLoading) {
    return (
      <Spinner light={true} />
    )
  }

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
              Total Teams: {teams.length}
              <br />
            </h3>
            <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
              Completed Teams: {teams.filter(t => t.team_members.length === 3).length}
              <br />
            </h3>
            <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
              Missing Captain: {teams.filter(t => t.team_members.length === 0).length}
              <br />
            </h3>

            <h3 className={"font-semibold text-lg " + (color === "light" ? "text-blueGray-700" : "text-white")}>
              Missing Members: {teams.filter(t => t.team_members.length < 3).length}
              <br />
            </h3>
          </div>
          <div>
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
                Team
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                }
              >
                Captain
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                }
              >
                Members
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team =>
              <tr key={team.id}>
                <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {team.name}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {users.find(u => u.id === team.team_members.find(t => t.member_type === TeamMemberType.CAPTAIN)?.user_id)?.name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {users.filter(u => team.team_members.find(t => t.user_id === u.id && t.member_type !== TeamMemberType.CAPTAIN)).map(u => u.name).join(', ')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function CardSeededTeamsTable({ color }) {
  return (
    <Suspense fallback={<div></div>}>
      <AllTeams color={color} />
    </Suspense>
  );
}

CardSeededTeamsTable.defaultProps = {
  color: "light",
};

CardSeededTeamsTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
