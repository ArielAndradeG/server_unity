const gestor = require('../games/TTT/gestor.js');

exports = module.exports = function(io){
    io.on('connection', function(socket) {
        console.log('new connection: ' + socket.id);
    
        socket.on('gestion', async (formulario) => {
            var respuesta = gestor.checarGestor(formulario,socket);
			responder(respuesta,io,socket)
        })
    
        socket.on('movimiento', (mensaje) => {
            var respuesta = gestor.checarMovimiento(mensaje);
            responder(respuesta,io,socket)
        })
    
        socket.on('disconnect', function() {
			console.log('disconnect: ' + socket.id)
            var respuesta = gestor.desconexion(socket);
			responder(respuesta,io,socket);
        })
    });
	
	function responder(respuesta,io,socket){
		if(respuesta.response.para=="matar"){
			io.to(socket.id).emit('respuesta', respuesta);
			socket.disconnect();
		}else if(respuesta.response.para=="emisor"){
            io.to(socket.id).emit('respuesta', respuesta);
        }else if(respuesta.response.para=="sesion"){
			socket.broadcast.to(respuesta.response.room).emit('respuesta', respuesta);
            //io.in(respuesta.response.room).emit('respuesta', respuesta);
		}else if(respuesta.response.para=="todos"){
			console.log(respuesta);
            io.emit('respuesta', respuesta);
        }else{
			return;
		}
	}
}