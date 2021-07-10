import { readTeam } from '../../../repositories/team';
import { queryParamAsString } from '../../../util/routes';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const teamId = queryParamAsString(req.query.teamId)

            if (teamId) {
                const event = await readTeam(teamId)
                res.status(200).json(event)
            }

            else {
                res.status(400).end()
            }

            break

        default:
            res.status(405).end()
            break
    }
}