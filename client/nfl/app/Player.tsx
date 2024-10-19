import React from "react";

interface PlayerProps {
  player: {
    name?: string;
    team?: string;
    age?: number;
    position?: string;
    img?: string;
    team_img?: string;
  };
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div className="flex flex-col justify-start items-center mt-10">
      {/* Container com a foto da NFL e o título "Estatísticas da NFL" */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          className="w-16 h-16 object-cover"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" // Logo da NFL
          alt="Logo da NFL"
        />
        <h1 className="text-3xl font-bold">Estatísticas da NFL</h1>
      </div>
      <div className="flex flex-col md:flex-row bg-gray-100 w-3/4 p-4 rounded-lg shadow-lg">
        {/* Container da foto do jogador */}
        <div className="flex flex-col items-center bg-white p-4 rounded-lg w-full md:w-1/2">
          <img
            className="w-64 h-64 object-cover rounded-lg"
            src={player?.img || "https://via.placeholder.com/150"}
            alt="Foto do Jogador"
          />
          <h2 className="text-2xl font-semibold mt-4">
            {player?.name || "Nome do Jogador"}
          </h2>
          <p className="text-lg text-gray-600">{player.team || "Time"}</p>
        </div>

        {/* Container da foto do time e informações adicionais */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 space-y-4">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 object-cover rounded-md"
              src={player.team_img || "https://via.placeholder.com/100"}
              alt="Logo do Time"
            />
            <p className="text-md font-semibold mt-2">
              {player.team || "Nome do Time"}
            </p>
          </div>

          <div className="text-lg">
            <p>Idade: {"25"}</p>
            <p>Posição: {"Quarterback"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
