import socket from 'socket.io-client';
import { API } from './define';
export const client = socket.connect(API);
