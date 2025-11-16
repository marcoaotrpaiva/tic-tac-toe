import { io, Socket } from 'socket.io-client';

export function connectSocket(): Socket {
  return io('http://192.168.1.241:4000', {
    transports: ['websocket'],
  });
}
