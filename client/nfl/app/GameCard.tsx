import React from "react";

export interface Game {
  game: {
    home_team: {
      url: string;
      name: string;
      abbr: string;
    };
    home_score: number;
    away_team: {
      url: string;
      name: string;
      abbr: string;
    };
    away_score: number;
  };
  rushing_yards: number;
  receiving_yards: number;
  tds: number;
  attempts: number;
  completions: number;
  passing_yards: number;
  interceptions: number;
  passing_tds: number;
  carries: number;
  rushing_tds: number;
  receptions: number;
  targets: number;
  receiving_tds: number;
}

interface GameProps {
  game: Game;
}

const GameCard: React.FC<GameProps> = ({ game }) => {
  return (
    <div className="flex items-center justify-around w-10/12 h-20 bg-gray-100 border border-gray-300 rounded-lg shadow-md mx-auto my-4">
      {/* Foto e placar do time mandante */}
      <div className="flex items-center">
        <img
          src={game.game.away_team.url}
          alt={game.game.away_team.name}
          className="w-12 h-12 object-cover rounded-full mr-2"
        />
        <span className="text-xl font-semibold">{game.game.away_score}</span>
      </div>

      {/* Separador com o "X" */}
      <div className="text-xl font-semibold">X</div>

      {/* Foto e placar do time visitante */}
      <div className="flex items-center">
        <span className="text-xl font-semibold mr-2">
          {game.game.home_score}
        </span>
        <img
          src={game.game.home_team.url}
          alt={game.game.home_team.name}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>

      {/* Jardas Corridas */}
      <div className="text-center">
        <span className="block text-sm text-gray-500">Jardas Corridas</span>
        <span className="text-lg font-medium">{game.rushing_yards}</span>
      </div>

      {/* Jardas Recebidas */}
      <div className="text-center">
        <span className="block text-sm text-gray-500">Jardas Recebidas</span>
        <span className="text-lg font-medium">{game.receiving_yards}</span>
      </div>

      {/* Touchdowns */}
      <div className="text-center">
        <span className="block text-sm text-gray-500">TD</span>
        <span className="text-lg font-medium">{game.tds}</span>
      </div>
    </div>
  );
};

export default GameCard;
