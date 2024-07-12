//simple webSocket server
import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 3000 });
const gameManager = new GameManager();
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  gameManager.addUser(ws);
  ws.send('Welcome on the chess server');
  ws.on('disconnect', () => {
    gameManager.removeUser(ws);
  });
});
