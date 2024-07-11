import { Chess } from "chess.js";
import { WebSocket } from "ws";
import {GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    public startTime: Date;
    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        // this.board = "";//rkbqkbkrpppppppp--------------------------------PPPPPPPPRKBQKBKR
        this.board = new Chess();
        this.startTime = new Date();
        player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white'
            }
        }));
        player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black'
            }
        }));
    }
    makeMove(socket: WebSocket, move: {from: string, to: string}){
        //validation here
        //is it this player turn using zod
        //player1 is always white
        if(this.board.turn() == 'b' && socket === this.player1){
            console.log("Not Black Turn");
            return;
        }
        if(this.board.turn() == 'w' && socket === this.player2){
            console.log("Not White Turn");
            return;
        }
        // is move valid , chess.js will take care of that
        try {
            this.board.move(move);
        } catch (error) {
            console.log("Error making move");
            console.log(error);
            return;
        }
        // is the game over
        if(this.board.isGameOver()){
            //send the game over message
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
        }
        //send the updated board to the players
        if(this.board.turn() === 'b'){//because turn changes after each move
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
                
            }));
        }else{
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
    }
}