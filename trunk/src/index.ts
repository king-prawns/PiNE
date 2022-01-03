import cors from 'cors';
import express, {Express} from 'express';
import http, {Server as HttpServer} from 'http';
import {Namespace, Server, Socket} from 'socket.io';

import rejectFilter from './proxy/filters/reject';
import chunkRoute from './proxy/routes/chunk';
import manifestRoute from './proxy/routes/manifest';
import ENamespace from './shared/enum/ENamespace';
import EPort from './shared/enum/EPort';
import branchConnection from './socket/branch/connection';
import clientConnection from './socket/client/connection';

const app: Express = express();
app.use(cors());

app.get('/manifest/:file', rejectFilter, manifestRoute);
app.get('/chunk/:file', rejectFilter, chunkRoute);

const server: HttpServer = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const client: Namespace = io.of(`/${ENamespace.CLIENT}`);
const branch: Namespace = io.of(`/${ENamespace.BRANCH}`);

client.on('connection', (socket: Socket) => clientConnection(socket, branch));
branch.on('connection', (socket: Socket) => branchConnection(socket, client));

server.listen(EPort.TRUNK);
