const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io');
const port = 2705;
const socket = io(http);

app.use(express.static(`${__dirname}/client`));

socket.on('connection', (socket) => {
    console.log('usuario conectado');

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`);

        socket.broadcast.emit('received', {
            message: msg
        });
    });
});

http.listen(port, () => {
    console.log(`conectado en el puerto ${port}`);
});