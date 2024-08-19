import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { UserRouter, SnapRouter } from './route/index.js';
import { socketServer } from './boot/server.js';

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

app.use(UserRouter);
app.use(SnapRouter);

app.use(router);

const server = http.createServer(app);

socketServer(server);

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
