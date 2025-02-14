const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {}; // Objeto para almacenar las salas y sus usuarios

io.on('connection', (socket) => {
  console.log('Un usuario se conectó:', socket.id);

  socket.on('create_room', (roomCode) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = [];
      console.log(`Sala creada: ${roomCode}`);
    }

    if (rooms[roomCode].length < 2) {
      rooms[roomCode].push(socket.id);
      socket.join(roomCode);
      io.to(roomCode).emit('room_update', rooms[roomCode]); // Actualizar usuarios en la sala
    } else {
      socket.emit('error', 'La sala ya está llena');
    }
  });

  socket.on('join_room', (roomCode) => {
    if (rooms[roomCode] && rooms[roomCode].length < 2) {
      rooms[roomCode].push(socket.id);
      socket.join(roomCode);
      io.to(roomCode).emit('room_update', rooms[roomCode]);
    } else {
      socket.emit('error', 'La sala no existe o está llena');
    }
  });

  socket.on('disconnect', () => {
    for (const roomCode in rooms) {
      const index = rooms[roomCode].indexOf(socket.id);
      if (index !== -1) {
        rooms[roomCode].splice(index, 1);
        if (rooms[roomCode].length === 0) delete rooms[roomCode];
        else io.to(roomCode).emit('room_update', rooms[roomCode]);
        console.log(`Usuario desconectado de sala ${roomCode}:`, socket.id);
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
