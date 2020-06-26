const { Game, Player } = require("./game.js");
const persistencia = require('../../database/database.js');
const acciones = ["Actualizar","Tirar","Acceder"];

var partidas = [
    //{'room':'room','game':Game}
];
var usuarios = {
    //'userHash': 'room'
};

var self = module.exports = {
    checarMovimiento: (mensaje) => {
		var resultado = mensaje;
        if(mensaje.request.accion == "Tirar"){
			resultado.response = {};
			resultado.response.para = "emisor";
            resultado.response.texto = "hi";//getGame(mensaje.sesion).playTurn(mensaje.fil, mensaje.col, mensaje.token);
			
		}
        return resultado;
    },
    checarGestor: (mensaje,socket) => {
        var resultado;
        if(mensaje.request.accion == "Acceder"){
            resultado = gestionarAcceso(mensaje,socket);
        }else if(mensaje.request.accion == "Actualizar"){
			resultado = gestionarActualizar(mensaje);
		}
        return resultado;
    },
    desconexion: (socket) =>{
		respuesta = {response:{"para":"todos","mensaje":"usuario ha salido","nombre":"","room":usuarios[socket.id]}}
        delete usuarios[socket.id];
		return respuesta;
    },
	validarUsuario: (mensaje) =>{
		var resultado = mensaje;
        var idSesion = mensaje.sesion;
		var token = mensaje.token;
		
		if(existGame(idSesion)){
			
		}else{
			resultado.estatus = "error";
            resultado.response= "partida no existe";
			resultado.para = "emisor";
        }
		return resultado;
	},
	validarAccion: (mensaje) =>{
		var resultado = mensaje;
		var existe = partidas.find(r => r.id === idPartida);
		var existe = (existe)?true:false;
		if(existe){
			resultado.estatus = "ok";
		}else{
            resultado.estatus = "error";
            resultado.response= "partida no existe";
			resultado.para = "emisor";
        }
		return resultado;
	}
}

function gestionarAcceso(form,socket){
    usuarios[socket.id] = form.request.sesion;
    socket.join(form.sesion);
	console.log(usuarios);
    return {
		response:{
			de: 'server',
			para: 'emisor',
			mensaje: `${form.nam}.`,
			estatus: 'ok'
		}
	};
}

function gestionarActualizar(form){
    return {
        de: 'server',
        para: 'emisor',
        mensaje: 'Actualizado',
        estatus: 'ok'
    };
}

function joinGame(idPartida,user){
    if(existGame(idPartida)){
        var game = getGame(idPartida);
        playerNew = new Player("user1","O",false);
        game.addPlayer(playerNew);
        return "eres el user1 para O y es no es tu turno";
        
    }else{
        createGame(idPartida);
        var game = getGame(idPartida);  
        playerNew = new Player("user0","X",true);
        game.addPlayer(playerNew);
        return "eres el user0 para X y es tu turno";
    }
}

function createGame(idPartida){
    if(!existGame(idPartida)){
        var partida = new Game(idPartida);
        partidas.push(partida);
        console.log(partidas);
    }
}

function existGame(idPartida){
    var existe = partidas.find(r => r.id === idPartida);
    return (existe)?true:false;
}

function getGame(idPartida){
    var partida = partidas.find(r => r.id === idPartida);
    return partida;
}
