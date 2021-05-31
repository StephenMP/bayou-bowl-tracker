import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../../types/next';
import { queryParamAsString } from '../../../util/routes';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (req.method === "POST") {
        const event = queryParamAsString(req.query.event)
        const message = req.body;
    
        res?.socket?.server?.io?.emit(event, message);
    
        res.status(201).json(message);
      }
})