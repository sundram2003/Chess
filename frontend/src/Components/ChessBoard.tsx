import React, { useState } from 'react';

import { Color, PieceSymbol, Square } from 'chess.js';
import { MOVE } from '../Screens/Game';

export const ChessBoard = ({
  socket,
  setBoard,
  chess,
  board,
}: {
  chess: any;
  setBoard: any;

  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  // const [to, setTo] = useState<null | Square>(null);
  return (
    <div className="grid grid-rows-8 gap-0">
      {board.map((row, i) => (
        <div key={i} className="flex flex-row">
          {row.map((square, j) => {
            const squareRepresentation = (String.fromCharCode(97 + (j % 8)) + '' + (8 - i)) as Square;
            return (
              <div
                onClick={() => {
                  if (!from) {
                    setFrom(squareRepresentation);
                  } else {
                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          from,
                          to: squareRepresentation,
                        },
                      })
                    );
                    setFrom(null);
                    chess.move({
                      from,
                      to: squareRepresentation,
                    });
                    setBoard(chess.board());
                    console.log({ from, to: squareRepresentation });
                  }
                }}
                key={j}
                className={`w-12 h-12 flex justify-center items-center ${
                  (i + j) % 2 === 0 ? 'bg-gray-400' : 'bg-gray-200'
                }`}
              >
                {square ? (
                  <div className={`text-3xl text-${square.color === 'w' ? 'white' : 'black'}`}>{square.type}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
