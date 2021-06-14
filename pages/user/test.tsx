import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from "react";
import Spinner from '../../components/PageChange/Spinner';
import Admin from "../../layouts/Admin";

const UserEvents = withPageAuthRequired(() => {
  const light = true

  return (
    <>
      <Spinner light={true} />
    </>
  );
})

UserEvents['layout'] = Admin;

export default UserEvents