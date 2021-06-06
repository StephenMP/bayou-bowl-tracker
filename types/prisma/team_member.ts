import { Team, TeamMember as PTeamMember } from '@prisma/client'

export type TeamMember = (
    PTeamMember & {
        team?: Team
    }
)