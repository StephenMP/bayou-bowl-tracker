import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Navbar transparent />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://www.huntshowdown.com//files/screenshots/09_Hunt_screenshot_Update2.0.jpg')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          heigh={800}
                          width={800}
                          src={user.picture}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            N/A
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Kills
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            N/A
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Deaths
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            N/A
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Assists
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {user.name ?? user.email}
                    </h3>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                      {user.email}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-users mr-2 text-lg text-blueGray-400"></i>
                      N/A
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fab fa-twitch mr-2 text-lg text-blueGray-400"></i>
                      N/A
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fab fa-steam mr-2 text-lg text-blueGray-400"></i>
                      N/A
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fab fa-discord mr-2 text-lg text-blueGray-400"></i>
                      N/A
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <h3 className="text-lg font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                          About Me
                        </h3>
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          aliquet lectus proin nibh nisl condimentum id venenatis a 
                          condimentum vitae sapien pellentesque habitant morbi tristique 
                          senectus et netus et malesuada fames ac turpis egestas sed 
                          tempus urna et pharetra pharetra massa massa ultricies mi quis 
                          hendrerit dolor magna eget est lorem ipsum dolor sit amet 
                          consectetur adipiscing elit pellentesque
                        </p>
                      </div>
                    </div>
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

  return <a href="/api/auth/login">Login</a>
}
