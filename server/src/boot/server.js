import { Server } from 'socket.io';

export const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: `*`,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('client:snap:create', (data) => {
      io.emit('server:snap:create', data);
    });

    socket.on('client:user:create', (data) => {
      io.emit('server:user:create', data);
    });

    socket.on('disconnecting', (reason) => {});
  });
};
