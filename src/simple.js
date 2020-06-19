var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var dotenv = require('dotenv').config();

app.set('port', process.env.APP_PORT || 3000);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//sockets = require('./private/socket-chat.js')(io);
sockets = require('./listener/socket_TTT.js')(io);

http.listen(app.get('port'), function () {
    console.log('app listening on *' + app.get('port'));
});