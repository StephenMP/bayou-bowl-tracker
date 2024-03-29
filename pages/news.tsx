import Plyr from 'plyr-react'
import React from 'react'
import Footer from '../components/Footers/Footer'
import Navbar from '../components/Navbars/AuthNavbar'
import Image from 'next/image'

export const plyrStyle: React.CSSProperties = {
  height: 592,
  width: 333,
}

export const plyrSourceInfo = (src: string) => {
  return {
    type: 'video',
    sources: [
      {
        src,
        size: 720,
        provider: 'youtube',
      },
    ],
  } as Plyr.SourceInfo
}

export const videoOpts: Plyr.Options = {
  ads: { enabled: false, publisherId: '' },
  hideControls: true,
}

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url('/img/headings/bg-news.jpg')",
            }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 text-font-mnh">
                  <h1 className="text-white font-semibold text-8xl">News</h1>
                  <p className="mt-4 text-4xl text-blueGray-200">Stay up to date with the latest Bayou Bowl News</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: 'translateZ(0)' }}
          ></div>
        </div>

        <section id="news" className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">Official Winners Announced!</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">6 Dec 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  The VODs have been reviewed and the winners announced! The following list is your top 10 finishers!
                </p>
                <p className="text-lg font-light leading-relaxres enteed mt-0 mb-4 text-blueGray-600">
                  <ol>
                    <li className="px-3">01. Rachtaz</li>
                    <li className="px-3">02. Whityyy</li>
                    <li className="px-3">03. FailSpawner</li>
                    <li className="px-3">04. ArchieTV</li>
                    <li className="px-3">05. Daexyn</li>
                    <li className="px-3">06. CaffeinatedNurgling</li>
                    <li className="px-3">07. PostPoison</li>
                    <li className="px-3">08. gunsmackk</li>
                    <li className="px-3">09. DemonLord100</li>
                    <li className="px-3">10. GregorianHipster</li>
                  </ol>
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image alt="BB3 News Participants" src="/img/news/Announce4.png" width={592} height={333} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Everything you Need to Know to Compete in Bayou Bowl III
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">2 Dec 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Monday Night Hunts has released a video explaining everything required of registered participants for
                  Bayou Bowl III.
                </p>
                <p className="text-lg font-light leading-relaxres enteed mt-0 mb-4 text-blueGray-600">
                  If you are competing this weekend, it is highly recommended that you take a few moments to review this
                  crucial information. Bayou Bowl III will take place on December 4th, 2021 at 1 PM EST on{' '}
                  <a href="https://twitch.tv/MondayNightHunts" className="font-bold">
                    twitch.tv/MondayNightHunts.
                  </a>
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Plyr source={plyrSourceInfo('JdCqGIjI8t4')} options={videoOpts} style={plyrStyle} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">Official Participant List is Out Now!</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">22 Nov 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  After three weeks of open registration, the final list of participants for Bayou Bowl III is now
                  officially released. In total, 176 hunter will compete for the $2,500 prize pool. Bayou Bowl III will
                  feature the biggest names in Hunt: Showdown.
                </p>
                <p className="text-lg font-light leading-relaxres enteed mt-0 mb-4 text-blueGray-600">
                  Legends like ArchieTV, LordJamesDelaney, Khalamity, Neenoh, Daexyn, and FailSpawner will go head to
                  head in individual competition to claim the title of Champion of the Bayou on December 4th, 2021 at 1
                  PM EST on{' '}
                  <a href="https://twitch.tv/MondayNightHunts" className="font-bold">
                    twitch.tv/MondayNightHunts.
                  </a>
                  . Don't miss it!
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image
                  alt="BB3 News Participants"
                  src="/img/news/Participant_List_Announcement.png"
                  width={592}
                  height={333}
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Registration for the Bayou Bowl III is Now Open!
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">30 Oct 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Registration for the Bayou Bowl III has now officially opened. Registration is easy and takes less
                  than 30 seconds.
                </p>
                <p className="text-lg font-light leading-relaxres enteed mt-0 mb-4 text-blueGray-600">
                  To register, you must:
                  <ol>
                    <li className="ml-3">1. Sign in or create an account</li>
                    <li className="ml-3">2. Make sure your Twitch Name (not URL) is filled in on your profile</li>
                    <li className="ml-3">3. Click Events on the left side bar</li>
                    <li className="ml-3">4. Under Bayou Bowl III, click Register</li>
                    <li className="ml-3">5. DONE!</li>
                  </ol>
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Plyr source={plyrSourceInfo('Llmcs9rhfrQ')} options={videoOpts} style={plyrStyle} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">Bayou Bowl III Rules Now Available</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">22 Oct 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  The Official Rules for Bayou Bowl III are now available{' '}
                  <a
                    className="font-bold"
                    href="/pdf/Bayou_Bowl_III_Rules.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  . As is our goal with all of our competitions, we strive to create a rule set that ensures the fairest
                  playing field for all hunters.
                </p>
                <p className="text-lg font-light leading-relaxres enteed mt-0 mb-4 text-blueGray-600">
                  All hunters should take some time to read the rules, so that they are aware of their responsibilities
                  when competing. If you have any questions on the rules, please feel free to ask them in the{' '}
                  <a
                    className="font-bold"
                    href="https://discord.gg/eR87mZtq6F"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MNH Discord
                  </a>
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image alt="BB3 News Rules" src="/img/news/BB3_Rules_Released.png" width={592} height={333} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">Bayou Bowl III is Officially Announced</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">11 Oct 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Bayou Bowl III will be on Saturday, 4 December 2021 from 1 to 4 PM EST. This time there is no tiers,
                  no teams, and no hiding! This will be a solo quickplay competition and, for the first time ever, the
                  Bayou Bowl victors will receive cash prizes.
                </p>
                <p className="text-lg font-light leading-relaxres enteed mt-0 mb-4 text-blueGray-600">
                  Registration will be open from 30 October to 20 November 2021 at bayoubowl.gg. Official rules and more
                  details to be released soon. We look forward to an exciting event. See you soon Hunters!
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image alt="News Article Image" width={592} height={333} src="/img/news/BB3_Announced.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">Prizes for Winners Officially Announced</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">12 July 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Prizes for Bayou Bowl II are officially announced!
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The top three teams in the Seeded tier will receive 3 official Hunt: Showdown t-shirts and a selection
                  of DLCs. 10 random-selected Open tier teams will receive DLC packs of their choice. Prizes are
                  graciously provided by Crytek.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image alt="News Article Image" width={592} height={333} src="/img/news/Prizes_Announcement.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">You Can Now Practice Entering Scores</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">5 July 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  As we approach competition day, we want to make sure that everyone is comfortable using the system for
                  entering scores. This is why we have opened a test event and are now allowing team captains to enter
                  scores for the test event.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The test event is exactly that, a test. No scores entered in the test event will count towards the
                  actual Bayou Bowl II tournament.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For info on how to enter scores, please watch the video{' '}
                  <strong>
                    <a href="https://youtu.be/--qrNHvfcSs">here</a>
                  </strong>
                  .
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Plyr source={plyrSourceInfo('--qrNHvfcSs')} options={videoOpts} style={plyrStyle} />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  The Official Bayou Bowl II team lists for Seeded and Open Tiers are released
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">28 June 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  With 65 teams applying, the official Bayou Bowl II team lists are now out. Head to{' '}
                  <strong>
                    <a href="https://bayoubowl.gg/teams">bayoubowl.gg/teams</a>
                  </strong>{' '}
                  for the full list. The team list features several well-known hunters and content creators from the
                  Hunt: Showdown community and many newcomers. The team list is broken into two-tiers: a seeded-tier of
                  high-skill players with a maximum of 20 teams and an open-tier of various-skill players with unlimited
                  teams.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Bayou Bowl II begins on Saturday, 17 July 2021 at Noon Eastern time and is gearing up to be the most
                  exciting competition yet. Good luck to all the competitors!
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image
                  alt="News Article Image"
                  width={592}
                  height={333}
                  src="/img/news/Official_Team_List_is_Out.png"
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Bayou Bowl II is now Officially a Tiered Competition – Seeded and Open Tiers
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">20 June 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Due to overwhelming interest, we are announcing that Bayou Bowl II will be a two-tier competition.
                  Participants applying to the competition will be organized into two-tiers: a seeded-tier of high-skill
                  players with a maximum of 20 teams and an open-tier of various-skill players with unlimited teams.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  All teams applying to compete will be eligible to participate in at least the open tier. Only the top
                  20 highest-skilled teams will be selected to participate in the seeded tier of the competition.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For more information on Bayou Bowl II, please visit bayoubowl.gg.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image alt="News Article Image" width={592} height={333} src="/img/news/Tiered_Splash.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Sign-ups for Bayou Bowl II Officially Open
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">4 June 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Applications for Bayou Bowl II are now open to all! To apply press on the "Apply to Compete” button in
                  the top right of the <a href="https://bayoubowl.gg">bayoubowl.gg</a> homepage. The top 20 teams of
                  three will be selected to compete in the most intense Hunt: Showdown competition that has ever taken
                  place. Only the best players will emerge the victors.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Applications to compete will close on 26 June 2021 at 11:59 PM EST.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Image alt="News Article Image" width={592} height={333} src="/img/news/Sign-Ups_Open_Splash.png" />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h6 className="text-lg mb-2 font-semibold leading-normal">Special Announcement</h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">May 11, 2021</h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  The Bayou Bowl II tournament has been announced!
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Starting on June 5th, 2021 players can begin applying to compete in the Bayou Bowl II tournament! The
                  tournament will consist of 20 teams of three in a Trio v. Trio all-out battle. Teams will be selected
                  based on KDA, Prestige Level, Hours Played, and general reputation in the Hunt community. Details on
                  how to sign-up will be released soon.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  For more information regarding the Bayou Bowl II tournament please watch the following video.
                </p>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <Plyr source={plyrSourceInfo('nhsXk4GK078')} options={videoOpts} style={plyrStyle} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
