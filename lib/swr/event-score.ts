import useSWR, { SWRConfiguration } from "swr"
import { fetcher } from "."
import { EventScore, PlayerScore } from "../../types/prisma"

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

type EventScoreByTeam = {
    teamName: string,
    teamId: string,
    kills: number,
    bounties: number,
    totalScore: number,
    totalRounds: number
}

export function useEventScoreForEventByTeam(eventId: string, options?: SWRConfiguration) {
    const eventScoresByTeam: EventScoreByTeam[] = []
    const { data, error } = useSWR<EventScore[]>(`/api/event-scores/event/${eventId}`, fetcher, options)

    if (data) {
        data.forEach(score => {
            const team = eventScoresByTeam.find(es => es.teamId === score.team_id)
            const bounties = score.team_score.bounties
            const kills = score.player_scores.reduce((prev: number, curr: PlayerScore) => prev + curr.kills, 0)
            if (team) {
                team.bounties += bounties
                team.kills += kills
                team.totalScore += calculateScore(score)
                team.totalRounds++
            }

            else {
                eventScoresByTeam.push({
                    teamName: score.team.name,
                    teamId: score.team_id,
                    bounties: bounties,
                    kills: kills,
                    totalScore: calculateScore(score),
                    totalRounds: 1
                })
            }
        });
    }

    return {
        eventScoresByTeam: eventScoresByTeam,
        error: error,
        isLoading: !error && !data,
    }
}

export function useEventScoreForTeam(teamId: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<EventScore[]>(`/api/event-scores/team/${teamId}`, fetcher, options)

    return {
        eventScores: data,
        error: error,
        isLoading: !error && !data,
    }
}