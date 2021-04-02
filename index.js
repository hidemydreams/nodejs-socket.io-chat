let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server)

server.listen(3001)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let users = [];
let connections = [];

io.sockets.on('connection', (socket) => {
    console.log('In')
    connections.push(socket);



    socket.on('disconnect', (disconnected) => {
        connections.splice(connections.indexOf(disconnected), 1)
        console.log('Out')
    })

    socket.on('send-message', (data) => {
        io.sockets.emit('add-message', {
            message: data.message,
            name: data.name
        })
    })
})