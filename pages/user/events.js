import React from "react";
import CardEvent from "components/Cards/CardEvent.js";
import Admin from "layouts/Admin.js";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const UserEvents = withPageAuthRequired(() => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">
          <CardEvent />
        </div>
      </div>
    </>
  );
})

UserEvents.layout = Admin;

export default UserEvents