import { NextApiRequest, NextApiResponse } from 'next'
import { readFromCache } from '../../../lib/redis'
import { EventScoreByTeam } from '../../../lib/swr/event-score'
import * as eventScoreRepository from '../../../repositories/event-score'
import { EventScore, PlayerScore } from '../../../types/prisma'

function calculateMoneyScore(money: number) {
  return money
}

function calculateSurvivedScore(survived: boolean) {
  return survived ? 50 : 0
}

function calculateScore(eventScore: EventScore) {
  const money = eventScore.team_score.hunt_dollars
  const survived = eventScore.team_score.survived

  return calculateSurvivedScore(survived) + calculateMoneyScore(money)
}

async function GetScores(eventId: string): Promise<EventScoreByTeam[]> {
  if (eventId) {
    const data = await eventScoreRepository.readEventScoresForEvent(eventId)
    const eventScoresByTeam: EventScoreByTeam[] = []
    if (data) {
      data.forEach((score) => {
        const team = eventScoresByTeam.find((es) => es.teamId === score.team_id)
        const bounties = score.team_score.bounties
        const kills = score.player_scores.reduce((prev: number, curr: PlayerScore) => prev + curr.kills, 0)
        if (team) {
          team.bounties += bounties
          team.kills += kills
          team.totalScore += calculateScore(score)
          team.totalRounds++
          team.totalHuntDollars += score.team_score.hunt_dollars
          team.totalSurvives += score.team_score.survived ? 1 : 0
        } else {
          eventScoresByTeam.push({
            teamName: score.team.name,
            teamId: score.team_id,
            bounties: bounties,
            kills: kills,
            totalScore: calculateScore(score),
            totalRounds: 1,
            totalHuntDollars: score.team_score.hunt_dollars,
            totalSurvives: score.team_score.survived ? 1 : 0,
          })
        }
      })

      return eventScoresByTeam
    }

    return []
  }

  return []
}

export type BB2LeaderboardScores = {
  seeded: EventScoreByTeam[]
  open: EventScoreByTeam[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const result = await readFromCache(
        'leaderboard-bb3',
        async () => {
          return await GetScores('c34c0105-349d-48f1-83e1-d3dd4e97765b')
        },
        60
      )

      res.status(200).json(result)
      break

    default:
      res.status(405).end()
      break
  }
}

export default handler
