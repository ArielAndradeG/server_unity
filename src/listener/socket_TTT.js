const gestor = require('../games/TTT/gestor.js');

exports = module.exports = function(io){
    require('socketio-auth')(io, {
        acceder: function (socket, data, callback) {
          var game = data.ses;
          var token = data.tok;
      
          //sesion = database.Login(game, token);
          console.log("try - "+game, token);
          if (true) {
            console.log("conected - "+game, token);
            socket.join(sesion.room);
            return callback(null, true);
          } else {
            return callback(new Error("User not found"));
          }
        }
    });

    io.on('connection', function(socket) {
        console.log('new connection: ' + socket.id);
    
        socket.on('gestion', async (form) => {
            var respuesta = gestor.checarGestor(form,socket);
            if(respuesta.para && respuesta.para=="emisor"){
                io.to(socket.id).emit('respuesta', respuesta);
            }
        })
    
        socket.on('movimiento', (message) => {
            var respuesta = gestor.checarMovimiento(message);
            
            if(respuesta.para & respuesta.para=="todos"){
                socket.emit('respuesta', respuesta);
                //socket.broadcast.to(send.room).emit('broadcast', send);
                //io.in(send.room).emit('respuesta', send);
            }
        })
    
        socket.on('disconnect', function() {
            gestor.desconexion(socket);
            
            console.log('disconnect: ' + socket.id)
            io.to(socket.id).emit('respuesta', JSON.parse('{"error":"No autorizado"}'));
            /*if(respuesta.para & respuesta.para=="grupo"){
                io.in(grespuesta.room).emit('aviso', respuesta);
            }*/
        })
    });
}