import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
// TODO: Move together, there's code repetition here
export const INIT_GAME = 'init_game';
export const MOVE = 'move';
import ChessBoard from '../Components/ChessBoard';
export const GAME_OVER = 'game_over';
import { useSocket } from '../hooks/useSocket';
const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  useEffect(() => {
    if (!socket) return;
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === INIT_GAME) {
          // setChess(new Chess());
          setBoard(chess.board());
          console.log('Game Started');
        } else if (data.type === MOVE) {
          const move = data.payload;
          console.log('MOve made');
          chess.move(move);
          setBoard(chess.board());
          console.log('Move Made');
        } else if (data.type === GAME_OVER) {
          console.log('Game Over');
        }
      };
    }
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="h-screen  bg-blue-950">
      <div className="justify-center flex ">
        <div className="pt-8 max-w-screen-lg w-full">
          <div className="grid grid-cols-6 gap-4 w-full">
            <div className="col-span-4 w-full flex justify-center">
              <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
            </div>
            <div className="col-span-2  w-full flex justify-center">
              <div className="pt-8">
                <button
                  onClick={() => socket.send(JSON.stringify({ type: INIT_GAME }))}
                  className="bg-blue-950 text-white p-2 rounded-md"
                >
                  Play Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
