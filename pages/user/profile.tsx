import React from "react"
import CardSettings from "../../components/Cards/CardSettings"
import CardProfile from "../../components/Cards/CardProfile"
import Admin from "../../layouts/Admin"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"

function User() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 px-4">
        <CardSettings />
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <CardProfile />
      </div>
    </div>
  )
}

const Settings = withPageAuthRequired(() => {
  // Render
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <User />
    </React.Suspense>
  );
})

Settings['layout'] = Admin;

export default Settings