const { Game, Player } = require("./game.js");
const persistencia = require('../../database/database.js');

var partidas = [
    //{'room':'room','game':Game}
];
var usuarios = {
    //'userHash': 'room'
};

var self = module.exports = {
    checarMovimiento: (mensaje) => {
        var resultado = {};
        var idSesion = mensaje.ses;

        if(mensaje.nom == "Acc"){
            resultado.response = joinGame(idSesion,resultado.user);
        }
        else if(mensaje.nom == "Tir"){
            if(existGame(idSesion)){
                resultado.response = getGame(idSesion).playTurn(result.row, result.column, result.user);
            }else{
                resultado.response= "tu partida no existe";
            }
        }else{
            resultado.response= "accion invalida";
        }

        return resultado;
    },
    checarGestor: (mensaje,socket) => {
        var respuesta;
        if(mensaje.nom == "Acc"){
            respuesta = gestionarAcceso(mensaje,socket)
        }
        return respuesta;
    },
    desconexion: (socket) =>{
        delete usuarios[socket.id];
    }
}

function gestionarAcceso(form,socket){
    usuarios[socket.id] = form.nam;
    socket.join(form.ses);
    return {
        de: 'server',
        para: 'emisor',
        mensaje: `${form.nam}.`,
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
