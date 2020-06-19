const mongo = require('../database/database.js');
/*mongo.connectToServer( function( err) {
  if (err) console.log(err);
  console.log('Database connected BD');
});*/

exports = module.exports = function(io){
    var users = {
        // 'oiajt974nvb9ba_anf': 'Ahmad', // example
    };
    
    io.on('connection', function(socket) {
        // Every socket connection has a unique ID
        console.log('new connection: ' + socket.id)
    
        // User Logged in
        socket.on('login', async (form) => {
            // Map socket.id to the name
            users[socket.id] = form.token;
            // Broadcast to everyone else (except the sender).
            // Say that the user has logged in.
            socket.broadcast.emit('msg', {
                from: 'server',
                message: `${form.token} logged in.`
            })
        })
    
        // Message Recieved
        socket.on('msg', (message) => {
            // Broadcast to everyone else (except the sender)
            socket.broadcast.emit('msg', {
                from: users[socket.id],
                message: message
            })
            // Send back the same message to the sender
            socket.emit('msg', {
                from: users[socket.id],
                message: message
            })
            // You could just do: io.emit('msg', ...)
            // which will send the message to all, including
            // the sender.
        })
    
        // Disconnected
        socket.on('disconnect', function() {
            // Remove the socket.id -> name mapping of this user
            console.log('disconnect: ' + users[socket.id])
            delete users[socket.id]
            // io.emit('disconnect', socket.id)
        })
    });

}