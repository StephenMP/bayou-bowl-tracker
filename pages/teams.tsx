import React from "react";
import { firstBy } from "thenby";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/AuthNavbar";
import Spinner from "../components/PageChange/Spinner";
import { useTeamsForEvent } from "../lib/swr";
import { useAllUsers } from "../lib/swr/users";

export default function Landing() {
  const { teams: seededTeams, isLoading: seededLoading } = useTeamsForEvent('623e0a1f-59a5-4d91-9edd-e20caf442ec5', { suspense: false })
  const { teams: openTeams, isLoading: openLoading } = useTeamsForEvent('a0f7848a-d1c2-456c-a0ce-47ea0873b8dc', { suspense: false })
  const { users, isLoading: usersLoading } = useAllUsers({ suspense: false })

  if (seededLoading || openLoading || usersLoading) {
    return (
      <Spinner light={true} />
    )
  }

  return (
    <>
      <Navbar />
      <main>
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
              <div className="w-full lg:w-7/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 mt-10">
                  <h1 className="mt-4 text-8xl font-bold uppercase text-blueGray-200">
                    Official Team List for The Bayou Bowl II
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
          </div>
        </div>

        <section id="rules" className="relative py-20 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">Seeded</h3>
                  <ul className="list-none mt-6">
                    {seededTeams.sort(firstBy('name')).filter(t => t.team_members.length).map(t => (
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-check"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-200">
                              <strong>{t.name}</strong>
                              {t.team_members.map(tm => (
                                <>
                                  <br />
                                  {` - ${users.find(u => u.id === tm.user_id)?.profile.steam_name ?? users.find(u => u.id === tm.user_id)?.name}`}
                                </>
                              ))}
                              {/* <br />- FailSpawner<br />- Maluke<br />- eklipselol */}
                            </h4>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">Open</h3>
                  <ul className="list-none mt-6">
                    {openTeams.sort(firstBy('name')).filter(t => t.team_members.length).map(t => (
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                              <i className="fas fa-check"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-200">
                              <strong>{t.name}</strong>
                              {t.team_members.map(tm => (
                                <>
                                  <br />
                                  {` - ${users.find(u => u.id === tm.user_id)?.profile.steam_name ?? users.find(u => u.id === tm.user_id)?.name}`}
                                </>
                              ))}
                              {/* <br />- FailSpawner<br />- Maluke<br />- eklipselol */}
                            </h4>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
