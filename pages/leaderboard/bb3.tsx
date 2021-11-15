import React from 'react'
import { firstBy } from 'thenby'
import Footer from '../../components/Footers/Footer'
import Navbar from '../../components/Navbars/AuthNavbar'
import Spinner from '../../components/PageChange/Spinner'
import { EventScoreByTeam, useEventScoresForBB3 } from '../../lib/swr/event-score'
import { truncate } from '../../util/string'

function calculateBountyScore(totalBounties: number) {
  let bountyScore = 0
  let tempTotalBounties = totalBounties
  while (tempTotalBounties > 2) {
    bountyScore += 1
    tempTotalBounties--
  }

  bountyScore += tempTotalBounties * 3
  return bountyScore
}

function calculateKillScore(totalKills: number) {
  return totalKills
}

function calculateScore(eventScore: EventScoreByTeam) {
  return calculateKillScore(eventScore.kills) + calculateBountyScore(eventScore.bounties)
}

function Table({ scores }: { scores: EventScoreByTeam[] }) {
  return (
    <>
      <div className="w-full mb-12 px-4"></div>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-600 text-center">BBIII Leaderboard</h3>
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-sm text-blueGray-600 text-center">Scores are automatically updated</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Place
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Competitor
                </th>
                <th className="px-6 md-hide align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Hunt Dollars
                </th>
                <th className="px-6 md-hide align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Survives
                </th>
                <th className="px-6 md-hide align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Games Played
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {scores
                ?.sort(
                  firstBy('totalScore', 'desc')
                    .thenBy('totalHuntDollars', 'desc')
                    .thenBy('totalSurvives', 'desc')
                    .thenBy('totalRounds')
                )
                .map((score, index) => (
                  <tr key={score.teamId}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {index + 1}
                    </td>
                    <td className="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <a href={`/team/${score.teamId}`} target="_blank">
                        {truncate(score.teamName, 18)} <i className="fas fa-link ml-2 text-xs text-blueGray-400"></i>
                      </a>
                    </td>
                    <td className="border-t-0 md-hide px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {score.totalHuntDollars}
                    </td>
                    <td className="border-t-0 md-hide px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {score.totalSurvives}
                    </td>
                    <td className="border-t-0 md-hide px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {score.totalRounds}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {score.totalScore}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Page() {
  const { bb3EventScores, isLoading } = useEventScoresForBB3({ suspense: false, refreshInterval: 60000 })

  return (
    <div className="flex flex-wrap w-full mt-4 mr-3 ml-3">
      <div className="w-full pr-3">{isLoading ? <Spinner light={true} /> : <Table scores={bb3EventScores} />}</div>
    </div>
  )
}

const EventPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/img/headings/bg-landing.jpg')" }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 mt-10 text-font-mnh">
                  <h1 className="mt-4 text-6xl uppercase font-bold text-blueGray-200">Bayou Bowl II Leaderboards</h1>
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
          <div className="flex justify-center">
            <Page />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default EventPage
