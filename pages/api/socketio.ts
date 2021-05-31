import { NextApiRequest } from "next";
import { getSocketIoServer } from "../../lib/socketio";
import { NextApiResponseServerIO } from "../../types/next";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    const socketServer = getSocketIoServer(res)

    if (socketServer) {
        res.status(201).end()
    }
    else {
        res.status(500).end()
    }
}
