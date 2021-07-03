import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from "react";
import CardTeamsTable from "../../../components/Cards/CardTeamsTable";
import Admin from "../../../layouts/Admin";

const AdminTeamsTable = withPageAuthRequired(() => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTeamsTable />
        </div>
      </div>
    </>
  );
});

AdminTeamsTable['layout'] = Admin

export default AdminTeamsTable
