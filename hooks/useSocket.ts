import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { constants } from '../util/constants'

const socket = socketIOClient(constants.SOCKET_URL, { path: '/api/socketio' })

export default function useSocket(eventName: string, callback: (...args: any[]) => void) {
  useEffect(() => {
    socket.on(eventName, callback)
    socket.connect()

    return function useSocketCleanup() {
      socket.off(eventName, callback)
    }
  }, [eventName, callback])

  return socket
}
