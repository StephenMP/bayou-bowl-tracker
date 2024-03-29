import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { readFromCache } from '../../../lib/redis'
import { EventScoreByTeam } from '../../../lib/swr/event-score'
import * as eventScoreRepository from '../../../repositories/event-score'
import { EventScore, PlayerScore } from '../../../types/prisma'

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

function calculateScore(eventScore: EventScore) {
  const bounties = eventScore.team_score.bounties
  const kills = eventScore.player_scores.reduce((prev: number, curr: PlayerScore) => {
    return prev + curr.kills
  }, 0)

  return calculateKillScore(kills) + calculateBountyScore(bounties)
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
        } else {
          eventScoresByTeam.push({
            teamName: score.team.name,
            teamId: score.team_id,
            bounties: bounties,
            kills: kills,
            totalScore: calculateScore(score),
            totalRounds: 1,
            totalHuntDollars: 0,
            totalSurvives: 0,
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
        'leaderboard-bb2',
        async () => {
          const seeded = await prisma.event.findFirst({
            where: {
              name: 'Bayou Bowl II - Seeded',
            },
          })

          const open = await prisma.event.findFirst({
            where: {
              name: 'Bayou Bowl II - Open',
            },
          })

          const data: BB2LeaderboardScores = {
            seeded: await GetScores(seeded.id),
            open: await GetScores(open.id),
          }

          return data
        },
        86400
      )

      res.status(200).json(result)
      break

    default:
      res.status(405).end()
      break
  }
}

export default handler
