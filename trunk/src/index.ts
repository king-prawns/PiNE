import cors from 'cors';
import express, {Express} from 'express';
import http, {Server as HttpServer} from 'http';
import {Namespace, Server, Socket} from 'socket.io';

import chunkRoute from './proxy/chunkRoute';
import manifestRoute from './proxy/manifestRoute';
import NAMESPACE from './shared/const/Namespace';
import PORT from './shared/const/Port';
import branchConnection from './socket/branch/connection';
import clientConnection from './socket/client/connection';

const app: Express = express();
app.use(cors());

app.get('/manifest/:file', manifestRoute);
app.get('/chunk/:file', chunkRoute);

const server: HttpServer = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const client: Namespace = io.of(`/${NAMESPACE.CLIENT}`);
const branch: Namespace = io.of(`/${NAMESPACE.BRANCH}`);

client.on('connection', (socket: Socket) => clientConnection(socket, branch));
branch.on('connection', branchConnection);

server.listen(PORT.TRUNK);
