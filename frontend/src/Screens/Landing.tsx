import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-800 text-white">
      <div className="flex-1 flex items-center justify-center p-4">
        <img src="MNNIT_CHESS_CLUB.jpg" alt="Chess Board" className="w-full max-w-md h-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">MNNIT Chess Club</h1>
        <p className="text-xl md:text-2xl mb-6 text-center">
          Welcome to the MNNIT Chess Club. We are a group of chess enthusiasts who love to play chess. We have a lot of
          events lined up for you. Stay tuned for more updates.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/game')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Online
          </button>
        </div>
      </div>
    </div>
  );
}
