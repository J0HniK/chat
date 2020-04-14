const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

console.log("http://localhost:3000");

server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

connection = [];

io.sockets.on('connection', function(socket) {
    console.log('connection')
    connection.push(socket);

    socket.on('disconnect', function(data) {
        connection.splice(connection.indexOf(socket), 1)
        console.log("disconnect")
    });

    socket.on("sendMessage", function(data) {
        io.sockets.emit('addMess', {msg: data})
    });
});
