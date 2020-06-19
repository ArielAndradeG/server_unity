class Game {
    static wins = [7, 56, 448, 73, 146, 292, 273, 84];

    constructor($id, $room) {
        this.id = $id;
        this.room = 'room';
        this.players = [];
        this.board = [2][2];
        //setTimeout(myFunc, 2000, 'funky');
        //onTimer();
    }

    displayBoard() {
        return this.board;
    }

    playTurn(row, col, user) {
        var player = this.getPlayer(user);
        if(player){
            if(player.currentTurn){
                this.board[row][col] = player.type;
            }else{
                return "no es tu turno";
            }
        }else{
            return "usuario no encontrado"
        }
    }

    getPlayer(user){
        var player = this.players.find(r => r.name === user);
        console.log(player);
        return player;
    }

    checkWinner(secuence,user) {
        
    }

    endGame(winner) {
        return {"message": winner +" ha ganado la partida"};
    }

    addPlayer(player){
        if(this.players.length < 2){
            this.players.push(player);
        }
    }

}

class Player {
    constructor(name, type, turn) {
        this.name = name;
        this.type = type;
        this.currentTurn = turn;
    }
    
    getPublicInfo() {
        return {"name":this.name,"type":this.type, "currentTurn":this.currentTurn, "bet":this.bet};
    }

    setCurrentTurn(currentTurn) {
        this.currentTurn = currentTurn
    }
}

i = 60;
function onTimer() {
    i--;
    if (i < 0) {
        console.log('You lose!');
    }
    else {
        setTimeout(onTimer, 1000);
    }
}

module.exports = {
    Game, Player
};
