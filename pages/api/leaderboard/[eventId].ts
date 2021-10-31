import { EventMatchType } from '.prisma/client'
import { EventScoreByTeam } from '../../../lib/swr/event-score'
import * as eventScoreRepository from '../../../repositories/event-score'
import { EventScore, PlayerScore } from '../../../types/prisma'
import { queryParamAsString } from '../../../util/routes'

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
  if (eventScore.event.match_type === EventMatchType.QUICKPLAY) {
    return eventScore.team_score.hunt_dollars + (eventScore.team_score.survived ? 50 : 0)
  }

  const bounties = eventScore.team_score.bounties
  const kills = eventScore.player_scores.reduce((prev: number, curr: PlayerScore) => {
    return prev + curr.kills
  }, 0)

  return calculateKillScore(kills) + calculateBountyScore(bounties)
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const eventId = queryParamAsString(req.query.eventId)

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
                totalSurvives: score.team_score.survived ? 1 : 0,
                totalHuntDollars: score.team_score.hunt_dollars,
              })
            }
          })
        }

        res.status(200).json(eventScoresByTeam)
      } else {
        res.status(400).end()
      }

      break

    default:
      res.status(405).end()
      break
  }
}
