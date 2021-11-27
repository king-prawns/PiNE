import cors from 'cors';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

import chunkRoute from './proxy/chunkRoute';
import manifestRoute from './proxy/manifestRoute';
import PORT from './shared/const/port';
import branchConnection from './socket/branch/connection';
import clientConnection from './socket/client/connection';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/manifest/:file', manifestRoute);
app.get('/chunk/:file', chunkRoute);
io.of('/client').on('connection', clientConnection);
io.of('/branch').on('connection', branchConnection);

server.listen(PORT.TRUNK);
