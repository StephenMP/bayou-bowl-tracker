import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from "react";
import { firstBy } from 'thenby';
import CardEvent from "../../components/Cards/CardEvent";
import Spinner from "../../components/PageChange/Spinner";
import Admin from "../../layouts/Admin";
import { useEvents } from "../../lib/swr";
import { useCurrentUserTeams } from '../../lib/swr/user';

const UserEvents = withPageAuthRequired(() => {
  const { events, isLoading } = useEvents()
  const { teams, isLoading:teamsLoading } = useCurrentUserTeams({ suspense: false })

  if (isLoading || teamsLoading) {
    return (
      <Spinner light={true} />
    )
  }

  return (
    <div className="flex flex-wrap">
      {events.filter(e => teams.find(t => t.event_id === e.id)).sort(firstBy('startDate')).map((event) =>
        <React.Suspense  key={`suspense-${event.id}`} fallback={<Spinner light={true} />} >
          <div key={event.id} className="w-full lg:w-4/12 px-4">
            <CardEvent event={event} />
          </div>
        </React.Suspense>
      )}
    </div>
  );
})

UserEvents['layout'] = Admin;

export default UserEvents