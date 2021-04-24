import React from "react";
import CardTable from "components/Cards/CardTable.js";
import Admin from "layouts/Admin.js";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AdminUsersTable = withPageAuthRequired(() => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </>
  );
});

AdminUsersTable.layout = Admin

export default AdminUsersTable
