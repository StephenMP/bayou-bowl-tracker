import { Event, Team, EventScore, TeamMember } from '@prisma/client'

export type TeamWithTeamMembers = (Team & { team_members: TeamMember[] })