import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from "react";
import CardSeededTeamsTable from "../../../components/Cards/CardSeededTeamsTable";
import Admin from "../../../layouts/Admin";

const AdminTeamsTable = withPageAuthRequired(() => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSeededTeamsTable />
        </div>
      </div>
    </>
  );
});

AdminTeamsTable['layout'] = Admin

export default AdminTeamsTable
