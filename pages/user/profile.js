import React from "react";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import Admin from "layouts/Admin.js";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  atom,
  useRecoilState,
} from 'recoil';
import { UserEntity } from "entities/user-entity";

export const profileState = atom({
  key: 'profileState',
  default: new UserEntity()
});

const Settings = withPageAuthRequired(() => {
  // Hooks
  const { user, error, isLoading } = useUser();
  const [profile, setProfile] = useRecoilState(profileState);

  // Component mounted hook
  React.useEffect(async () => {
    const res = await fetch('/api/user/profile')
    const data = await res.json()
    
    setProfile(() => data)
  }, []);

  // Render
  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings email={user.email} name={user.name} />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile email={user.email} name={user.name} picture={user.picture} />
        </div>
      </div>
    </>
  );
})

Settings.layout = Admin;

export default Settings