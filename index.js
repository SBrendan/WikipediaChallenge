var express = require('express');
var socket = require('socket.io');
var cors = require('cors');
var port = process.env.PORT || 3000;
var app = express();

app.use(cors());

var server = app.listen(port, function () {
    console.log("Listening on port", port)
});

app.use(express.static('public'));

var io = socket(server);

io.on("connection", function (socket) {
    console.log("made socket connection", socket.id);

    socket.on('data', function (data) {
        io.sockets.emit('data', data);
    });
});