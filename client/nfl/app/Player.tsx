import React from "react";
import Image from "next/image";

interface PlayerProps {
  player: {
    name?: string;
    // team?: Team;
    team?: string;
    position?: string;
    img?: string;
  };
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  if (!player) return null;
  return (
    <div className="flex flex-col justify-start items-center mt-10">
      {/* Container com a foto da NFL e o título "Estatísticas da NFL" */}
      <div className="flex flex-col md:flex-row bg-gray-100 w-3/4 p-4 rounded-lg shadow-lg">
        {/* Container da foto do jogador */}
        <div className="flex flex-col items-center bg-white p-4 rounded-lg w-full ">
          <Image
            className="w-64 h-64 object-cover rounded-lg"
            src={player?.img || "https://via.placeholder.com/150"}
            alt="Foto do Jogador"
            width={64}
            height={64}
            unoptimized
          />
          <h2 className="text-2xl font-semibold mt-4">
            {player.name || "Nome do Jogador"}
          </h2>
          {/* <p className="text-lg text-gray-600">{player.team?.abbr || "Time"}</p> */}
          <p className="text-lg text-gray-600">{player.team || "Time"}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
