import { Server as NetServer } from "http";
import { Server, Server as ServerIO } from 'socket.io';
import { NextApiResponseServerIO } from '../types/next';

export function getSocketIoServer(res: NextApiResponseServerIO): Server {
    if(!res.socket.server.io) {
        const server: NetServer = res.socket.server as any
        const io = new ServerIO(server, {
            path: '/api/socketio'
        })

        res.socket.server.io = io
    }

    return res.socket.server.io
}
