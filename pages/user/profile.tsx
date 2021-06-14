import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import React from "react"
import CardProfile from "../../components/Cards/CardProfile"
import CardSettings from "../../components/Cards/CardSettings"
import Spinner from "../../components/PageChange/Spinner"
import Admin from "../../layouts/Admin"

const Settings = withPageAuthRequired(() => {
  // Render
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 px-4">
        <React.Suspense fallback={<Spinner light={true} />}>
          <CardSettings />
        </React.Suspense>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <React.Suspense fallback={<Spinner light={true} />}>
          <CardProfile />
        </React.Suspense>
      </div>
    </div>
  );
})

Settings['layout'] = Admin;
export default Settings