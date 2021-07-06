import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from "react";
import { firstBy } from 'thenby';
import CardEvent from "../../components/Cards/CardEvent";
import Spinner from "../../components/PageChange/Spinner";
import Admin from "../../layouts/Admin";
import { useEvents } from "../../lib/swr";

const UserEvents = withPageAuthRequired(() => {
  const { events, isLoading } = useEvents()

  if (isLoading) {
    return (
      <Spinner light={true} />
    )
  }

  return (
    <div className="flex flex-wrap">
      {events.sort(firstBy('startDate')).filter(e => e.isActive).map((event) =>
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