import React from "react";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";
import { constants } from "../util/constants"

export default function Landing() {
  const isProduction = constants.ENVIRONMENT === 'PRODUCTION'

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
                  <h1 className="mt-4 text-6xl font-bold text-blueGray-200">
                    Rules
                  </h1>
                  <h3 className="mt-4 text-2xl text-blueGray-200">
                    Bayou Bowl II Tournament
                  </h3>
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
                  <h3 className="text-3xl font-semibold text-blueGray-200">General</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            This competition is limited to 4 hours.
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
                          <h4 className="text-blueGray-500">
                            Each team must have three (3) hunters to compete. This is a trios vs trios competition.
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
                          <h4 className="text-blueGray-500">
                            Teams may queue into US East, US West, EU, and Russia servers only.
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
                          <h4 className="text-blueGray-500">
                            Random contracts only.
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
                          <h4 className="text-blueGray-500">
                            At least one hunter must stream for the whole competition.
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
                          <h4 className="text-blueGray-500">
                            Streamers must have VODs turned on and available.
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
                          <h4 className="text-blueGray-500">
                            This competition is PC only.
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
                          <h4 className="text-blueGray-500">
                            Teams are encouraged, but not required to take breaks.
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
                          <h4 className="text-blueGray-500">
                            Hunters are prohibited from deliberately targeting, harassing, or displaying unsportsmanlike
                            conduct toward any other hunters during the competition; this can include verbal abuse,
                            text abuse, trolling, bullying, or VOIP abuse.
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
                          <h4 className="text-blueGray-500">
                            Competition officials reserve the right to disqualify any team or hunters for violating any of
                            the rules, or for any other reason not listed here, at any time, as they deem necessary. Any
                            actions that result in an unfair advantage for a team during the competition will result in
                            disqualification.
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
                          <h4 className="text-blueGray-500">
                            Hunters may be banned for any behavior on any other social media platform that is deemed
                            unacceptable by competition officials.
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
                          <h4 className="text-blueGray-500">
                            These rules are subject to change at any time without notice. Check https://bayoubowl.gg/rules for
                            the latest version of the official rules.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">Gameplay</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Queue sniping is NOT permitted. Stream sniping is NOT permitted. Teams in the
                            competition are forbidden from attempting to get into each other’s games.
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
                          <h4 className="text-blueGray-500">
                            Chats that are found to be relaying information to their streamer about other competitors
                            or other streamers without any recourse from their streamer, will have their streamer and
                            their team disqualified.
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
                          <h4 className="text-blueGray-500">
                            Pre-arranged alliances between teams are NOT permitted. You may form organic in-game
                            alliances with other teams during the competition, as per usual gameplay.
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
                          <h4 className="text-blueGray-500">
                            You may NOT obstruct a team on another’s behalf or have other hunters inhibit other teams
                            for your benefit.
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
                          <h4 className="text-blueGray-500">
                            Hunters are prohibited from using outside help during the competition, intentionally or
                            unintentionally (i.e. viewers or friend brings in higher tier weapons for them to use).
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
                          <h4 className="text-blueGray-500">
                            Hunters are prohibited from using the free weapons with legendary skins they purchase
                            with blood bonds during the competition.
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
                          <h4 className="text-blueGray-500">
                            Quick Play matches during the competition are NOT permitted. Hunter may use sole
                            survivors from QP games obtained prior to the competition.
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
                          <h4 className="text-blueGray-500">
                            Alternate accounts are permitted.
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
                          <h4 className="text-blueGray-500">
                            Hunters may have their rosters full or partially full before the competition in any
                            configuration with any permitted weapons/tools/consumables equipped.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200 mt-10">Weapons</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Players may not enter a match with a Dolch or Dolch Precision equipped on hunters. Players
                            are permitted to loot Dolches and Dolch Percisions for use in-game. Dolches looted in game
                            must be unequipped prior to the next match.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <h3 className="text-3xl font-semibold text-blueGray-200 mt-10">Scoring</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            <span className="underline">How to Win</span>: The team with the highest score at the end
                            of the competition will be declared the winner. Teams may secure points for kills
                            (1 point each) and bounty token extracted (3 points each for first and second bounty token,
                            1 point each for third and fourth bounty token).
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
                          <h4 className="text-blueGray-500">
                            If a hunter withdraws from the competition at any time for any reason, their team may
                            continue and the score of the quitting hunter at the time they withdraw will still be added
                            to the team’s score.
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
                          <h4 className="text-blueGray-500">
                            Hunters are on the honor system to report their team score and times on the scores entry
                            spreadsheet, here: bayoubowl.gg/scorecard.
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
                          <h4 className="text-blueGray-500">
                            Teams may only report points between matches once they have extracted or died.
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
                          <h4 className="text-blueGray-500">
                            You must show your mission summary screen showing the number of hunters killed card
                            and bounties extracted card for your points to count on stream.
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
                          <h4 className="text-blueGray-500">
                            If an entire team disconnects the points for that match will not count. If one hunter on the
                            team disconnects and the other hunter extracts or dies and sees the mission summary
                            screen, then the points will count.
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
                          <h4 className="text-blueGray-500">
                            The scoresheet (bayoubowl.gg/scorecard) will be LOCKED AT EXACTLY 4 PM EST. No scores
                            will be accepted after 4 PM EST.
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
                          <h4 className="text-blueGray-500">
                            In the case of score discrepancies or accusations of score manipulation, all complaints will
                            be thoroughly investigated and adjudicated after the competition by the competition
                            officials. Teams found engaging in falsifying scores will be disqualified and banned from
                            future competitions.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">Coordination</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Official time for the competition is Windows time. Ensure that your Windows clock is
                            synced with the Windows servers. The official timezone is US Eastern Time
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
                          <h4 className="text-blueGray-500">
                            The competition starts at exactly 12 PM EST. Hunters are not permitted to start a match
                            until 12 PM EST. The start of the match will be announced on GameswithDeath and
                            SaltyOctopus’ Twitch channels and on the bayoubowl.gg website.
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
                          <h4 className="text-blueGray-500">
                            The competition entry forms must be filled out no later than 6 March 2021 at 11:59 PM EST,
                            late submissions will not be accepted.
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
                          <h4 className="text-blueGray-500">
                            Competition officials reserve the right to limit the number of teams and who is selected to
                            participate.
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
                          <h4 className="text-blueGray-500">
                            The official team list will be published on 7 March 2021 by 11:59 PM at
                            bayoubowl.gg/teams.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <h3 className="text-3xl font-semibold text-blueGray-200 mt-10">Rebroadcasting</h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-check"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            The hosts of this competition (SaltyOctopus and GameswithDeath) will be rebroadcasting
                            and commentating in an esports format on the streamers participating. By signing up for
                            this competition you are giving permission to the hosts to rebroadcast your stream and
                            commentate on your gameplay during the competition.
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
