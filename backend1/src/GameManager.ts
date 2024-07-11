import { WebSocket, WebSocketServer } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./messages";


export class GameManager {
    private games: Game[] = [];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        //stop the game because user left
    }
    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            //parse the data
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    //start the game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }else{
                    console.log("New User Arrived");
                    this.pendingUser = socket;
                }
            }
            if(message.type === MOVE){
                //find the game
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    //send the move to the other player
                    game.makeMove(socket,message.move);
                }
            }
        });

    }
} 