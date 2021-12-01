import cors from 'cors';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

import chunkRoute from './proxy/chunkRoute';
import manifestRoute from './proxy/manifestRoute';
import NAMESPACE from './shared/const/Namespace';
import PORT from './shared/const/port';
import branchConnection from './socket/branch/connection';
import clientConnection from './socket/client/connection';

const app = express();
app.use(cors());

app.get('/manifest/:file', manifestRoute);
app.get('/chunk/:file', chunkRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const client = io.of(`/${NAMESPACE.CLIENT}`);
const branch = io.of(`/${NAMESPACE.BRANCH}`);

client.on('connection', socket => clientConnection(socket, branch));
branch.on('connection', branchConnection);

server.listen(PORT.TRUNK);
