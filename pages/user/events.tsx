import React from "react";
import CardEvent from "../../components/Cards/CardEvent";
import Admin from "../../layouts/Admin";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { eventsState } from '../../state/atoms'
import { useRecoilValue } from 'recoil'

const UserEvents = withPageAuthRequired(() => {
  const events = useRecoilValue(eventsState)

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">
          {events.map(event =>
            <CardEvent key={event.id} id={event.id} name={event.name} startDate={new Date(event.startDate).toLocaleDateString()} picture={event.picture} rulesLink='/' />
          )}
        </div>
      </div>
    </>
  );
})

UserEvents['layout'] = Admin;

export default UserEvents