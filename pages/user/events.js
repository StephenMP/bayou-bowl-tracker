import React from "react";
import CardEvent from "components/Cards/CardEvent.js";
import Admin from "layouts/Admin.js";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const UserEvents = withPageAuthRequired(() => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">
          <CardEvent id="test" name="Bayou Bowl II" startDate={new Date(2021, 6, 17).toLocaleDateString()} picture="https://trello-attachments.s3.amazonaws.com/604fe9255c0c0230f7cab23a/605665ed64f1d22238ad9d7e/7259c66fab50602169d90f92eb2ed1ab/The_Bayou_Bowl.png" />
        </div>
      </div>
    </>
  );
})

UserEvents.layout = Admin;

export default UserEvents