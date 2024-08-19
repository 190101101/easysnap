import socket from 'socket.io-client';
export const client = socket.connect('http://localhost:5000');
