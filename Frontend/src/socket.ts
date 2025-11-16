import { io, type Socket } from 'socket.io-client';

export function connectSocket(token: string): Socket {
  return io('http://localhost:4000', {
    transports: ['websocket'],
    auth: { token },
  });
}
