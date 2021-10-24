import { useRouter } from "next/router";
import React from "react";
import Footer from "../../components/Footers/Footer";
import Navbar from "../../components/Navbars/AuthNavbar";
import Spinner from "../../components/PageChange/Spinner";
import { useTeam } from "../../lib/swr";
import { useUser } from "../../lib/swr/user";
import { TeamMember } from "../../types/prisma";
import { queryParamAsString } from "../../util/routes";

function TeamCard({ teamMember }: { teamMember: TeamMember }) {
  const { user, isLoading } = useUser(teamMember.user_id)

  if (isLoading) {
    return (
      <Spinner light={false} />
    )
  }

  return (
    <div className="relative lg:w-3/12 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mr-3 ml-3">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:order-2 flex justify-center">
            <div className="flex justify-center">
              <img
                height={110}
                width={110}
                src={user.picture}
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {user.profile?.steam_name ?? user.name}
          </h3>
          <div className="mb-2 text-blueGray-600">
            <a href={user.profile?.twitch_name ? `https://twitch.tv/${user.profile.twitch_name}` : '#'} target='_blank'>
              <i className="fab fa-twitch mr-2 text-lg text-blueGray-400"></i>
              {user.profile?.twitch_name ?? 'N/A'}
              {user.profile?.twitch_name ? <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i> : <></>}
            </a>
          </div>
          <div className="mb-2 text-blueGray-600">
            <a href={user.profile?.twitter_name ? `https://twitter.com/${user.profile.twitter_name}` : '#'} target='_blank'>
              <i className="fab fa-twitter mr-2 text-lg text-blueGray-400"></i>
              {user.profile?.twitter_name ?? 'N/A'}
              {user.profile?.twitter_name ? <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i> : <></>}
            </a>
          </div>
          <div className="mb-2 text-blueGray-600">
            <i className="fab fa-discord mr-2 text-lg text-blueGray-400"></i>
            {user.profile?.discord_name ?? 'N/A'}
          </div>
          <div className="mb-2 text-blueGray-600">
            <i className="fab fa-steam mr-2 text-lg text-blueGray-400"></i>
            {user.profile?.steam_name ?? 'N/A'}
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {user.profile?.about_me ?? 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default function Profile() {
  const router = useRouter()
  const teamId = queryParamAsString(router.query.teamId)
  const { team, isLoading } = useTeam(teamId)

  if (isLoading) {
    return (
      <Spinner light={true} />
    )
  }

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/img/bg-landing.jpg')" }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 mt-10">
                  <h3 className="mt-4 text-6xl uppercase font-bold text-blueGray-200">
                    {team.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="relative py-16 bg-blueGray-200">
          <div className="flex flex-wrap mx-auto px-4 -mt-24 justify-center">
            {team.team_members.map(tm => (
              <TeamCard key={tm.user_id} teamMember={tm} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
