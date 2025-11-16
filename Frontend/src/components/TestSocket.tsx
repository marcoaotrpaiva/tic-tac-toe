import { useEffect } from 'react';
import { connectSocket } from '../socket/connectSocket.ts';
import type { Socket } from 'socket.io-client';

export default function TestSocket() {
  useEffect(() => {
    const socket: Socket = connectSocket();

    socket.on('connect', () => {
      console.log('⚡ connected:', socket.id);
      socket.emit('ping', 'hello from client'); // test event
    });

    socket.on('pong', (msg) => {
      console.log('📩 server replied:', msg);
    });

    // Cleanup that React requires
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket test running... open console</div>;
}
