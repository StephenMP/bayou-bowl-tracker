import React from "react";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/AuthNavbar";

export default function Landing() {
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
                    How To Compete in the Bayou Bowl II
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
          <h3 className="mt-4 text-center text-lg font-bold uppercase text-blueGray-200 mb-6">
            It is essential that you and you team complete these steps in order to compete. Please let us know if you have any questions
          </h3>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">1) Register as competitors at bayoubowl.gg</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Have each member of your team go to <strong><a href="https://bayoubowl.gg" >bayoubowl.gg</a></strong> and click on the register/sign in button in the top right corner (if on mobile, click on the hamburger icon in the top left).
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Please ensure that the profile details are filled out completely. Everyone should have a twitch, discord, and steam ID. Twitter is optional.
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Once all members of your team have registered as competitors, we will assign them to your teams in the system.
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Please ensure that your entire team is registered.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">2) Join The Official Event Discord</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Go to the <strong><a href="https://discord.gg/qgEXME6yKH">GameswithDeath discord here</a></strong> and request the competitor role in the “general” channel in the social channels category from Death if you do not already possess the role.
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Ensure that the Bayou Bowl II category with the rules-and-news, bayou-bowl-chat, feedback, scoresheet, and Voice Lounge channels are visible and you can interact with them.
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            The GameswithDeath discord is your best method to communicate with competition officials and other competitors. If you have any questions, opinions, or feedback feel free to communicate them through the discord.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200 mt-10">3) Form Your Team</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Go to <strong><a href="https://bayoubowl.gg" >bayoubowl.gg</a></strong> and sign into your account
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Click the link that was sent to your team captain via email. If your team captain hasn't sent you the link, make sure they check their email.
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            You should see a message saying that you've successfully joined your team. If you are a team captain, make sure to send the join link to your fellow team members.
                          </h4>
                        </div>
                      </div>
                    </li>
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
