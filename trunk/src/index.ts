import cors from 'cors';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

import {PORT_TRUNK} from '../../shared/const';
import chunkRoute from './proxy/chunkRoute';
import manifestRoute from './proxy/manifestRoute';

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

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT_TRUNK);
