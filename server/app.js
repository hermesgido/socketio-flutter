const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []


io.on('connection', (socket) => {
  console.log("Connected to backend socket");
  const username = socket.handshake.query.username
  console.log(username);
  socket.on('message', (data) => {
    const message = {
      message: data.message,
      senderUsername: username,
      sentAt: Date.now()
    }
    messages.push(message)
    io.emit('message', message)

  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});