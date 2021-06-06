import { Event, Team as PTeam, TeamMember } from '@prisma/client'

export type Team = (
    PTeam & {
        event?: Event
        team_members?: TeamMember[]
    }
)