import Plyr from 'plyr-react';
import React from "react";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/AuthNavbar";

export default function Landing() {
  const videoOpts: Plyr.Options = {
    ads: { enabled: false, publisherId: '' },
    hideControls: true
  }

  const videoSrc: Plyr.SourceInfo = {
    type: "video",
    sources: [
      {
        src: "nhsXk4GK078",
        size: 720,
        provider: 'youtube'
      }
    ]
  };

  const videoSrc2: Plyr.SourceInfo = {
    type: "video",
    sources: [
      {
        src: "--qrNHvfcSs",
        size: 720,
        provider: 'youtube'
      }
    ]
  };

  const plyrStyle: React.CSSProperties = {
    height: 500,
    width: 500
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
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 mt-10">
                  <h1 className="mt-4 text-8xl uppercase font-bold text-blueGray-200">
                    News
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

        <section id="news" className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Prizes for Winners Officially Announced
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  12 July 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Prizes for Bayou Bowl II are officially announced!
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The top three teams in the Seeded tier will receive 3 official Hunt: Showdown t-shirts and a selection of DLCs. 10 random-selected Open tier teams will receive DLC packs of their choice. Prizes are graciously provided by Crytek.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <img src="/img/news/Prizes_Announcement.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  You Can Now Practice Entering Scores
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  5 July 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  As we approach competition day, we want to make sure that everyone is comfortable using the system for entering scores. This is why we have opened a test event and are now allowing team captains to enter scores for the test event.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The test event is exactly that, a test. No scores entered in the test event will count towards the actual Bayou Bowl II tournament.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For info on how to enter scores, please watch the video <strong><a href="https://youtu.be/--qrNHvfcSs">here</a></strong>.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Plyr source={videoSrc2} options={videoOpts} style={plyrStyle} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  The Official Bayou Bowl II team lists for Seeded and Open Tiers are released
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  28 June 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  With 65 teams applying, the official Bayou Bowl II team lists are now out. Head to <strong><a href="https://bayoubowl.gg/teams">bayoubowl.gg/teams</a></strong> for the full list. The team list features several well-known hunters and content creators from the Hunt: Showdown community and many newcomers. The team list is broken into two-tiers: a seeded-tier of high-skill players with a maximum of 20 teams and an open-tier of various-skill players with unlimited teams.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Bayou Bowl II begins on Saturday, 17 July 2021 at Noon Eastern time and is gearing up to be the most exciting competition yet. Good luck to all the competitors!
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <img src="/img/news/Official_Team_List_is_Out.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Bayou Bowl II is now Officially a Tiered Competition ??? Seeded and Open Tiers
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  20 June 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Due to overwhelming interest, we are announcing that Bayou Bowl II will be a two-tier competition. Participants applying to the competition will be organized into two-tiers: a seeded-tier of high-skill players with a maximum of 20 teams and an open-tier of various-skill players with unlimited teams.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  All teams applying to compete will be eligible to participate in at least the open tier. Only the top 20 highest-skilled teams will be selected to participate in the seeded tier of the competition.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For more information on Bayou Bowl II, please visit bayoubowl.gg.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <img src="/img/news/Tiered_Splash.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Sign-ups for Bayou Bowl II Officially Open
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  4 June 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Applications for Bayou Bowl II are now open to all! To apply press on the "Apply to Compete??? button in the top right of the <a href="https://bayoubowl.gg">bayoubowl.gg</a> homepage. The top 20 teams of three will be selected to compete in the most intense Hunt: Showdown competition that has ever taken place. Only the best players will emerge the victors.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Applications to compete will close on 26 June 2021 at 11:59 PM EST.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <img src="/img/news/Sign-Ups_Open_Splash.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Special Announcement
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  May 11, 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  The Bayou Bowl II tournament has been announced!
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Starting on June 5th, 2021 players can begin applying to compete in the Bayou
                  Bowl II tournament! The tournament will consist of 20 teams of three in a
                  Trio v. Trio all-out battle. Teams will be selected based on KDA, Prestige
                  Level, Hours Played, and general reputation in the Hunt community. Details
                  on how to sign-up will be released soon.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For more information regarding the Bayou Bowl II tournament please watch the following video.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Plyr source={videoSrc} options={videoOpts} style={plyrStyle} />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
