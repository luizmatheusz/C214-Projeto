import React from "react";
import { Game } from "./GameCard";
import Image from "next/image";

interface GamesTableProps {
  games: Game[]; // Agora estamos esperando um array de jogos
  team?: string;
  position?: string;
}

const GamesTable: React.FC<GamesTableProps> = ({ games, team, position }) => {
  const isQB = position === "QB";
  return (
    <div className="overflow-x-auto flex w-[50%] mx-auto">
      <table className="min-w-full table-auto mx-auto border border-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-1 py-1 text-center w-[0.35%]" rowSpan={2}></th>
            <th className="px-1 py-1 text-center w-[0.35%]" rowSpan={2}>
              Fora
            </th>
            <th className="px-1 py-1 text-center w-[0.35%]" rowSpan={2}>
              Placar
            </th>
            <th className="px-1 py-1 text-center w-[0.35%]" rowSpan={2}>
              Casa
            </th>
            {/* Agrupamento para "Passes" */}
            {isQB && (
              <th className="px-1 py-1 text-center" colSpan={5}>
                Passe
              </th>
            )}
            {/* Agrupamento para "Corridas" */}
            <th className="px-1 py-1 text-center" colSpan={3}>
              Corrida
            </th>
            {/* Agrupamento para "Recepções" */}
            {!isQB && (
              <th className="px-1 py-1 text-center" colSpan={4}>
                Recepção
              </th>
            )}
          </tr>
          <tr className="bg-gray-100">
            {/* Colunas específicas dentro de "Passe" */}
            {isQB && <th className="px-1 py-1 text-center w-[1%]">CMP</th>}
            {isQB && <th className="px-1 py-1 text-center w-[1%]">TTV</th>}
            {isQB && <th className="px-1 py-1 text-center w-[1%]">JDS</th>}
            {isQB && <th className="px-1 py-1 text-center w-[1%]">INT</th>}
            {isQB && <th className="px-1 py-1 text-center w-[1%]">TD</th>}
            {/* Colunas específicas dentro de "Corrida" */}
            <th className="px-1 py-1 text-center w-[1%]">CAR</th>
            <th className="px-1 py-1 text-center w-[1%]">JDS</th>
            <th className="px-1 py-1 text-center w-[1%]">TD</th>
            {/* Colunas específicas dentro de "Recepção" */}
            {!isQB && <th className="px-1 py-1 text-center w-[1%]">RCP</th>}
            {!isQB && <th className="px-1 py-1 text-center w-[1%]">TGT</th>}
            {!isQB && <th className="px-1 py-1 text-center w-[1%]">JDS</th>}
            {!isQB && <th className="px-1 py-1 text-center w-[1%]">TD</th>}
          </tr>
        </thead>
        <tbody>
          {/* Mapeia todos os jogos e renderiza um GameCard para cada um */}
          {games && games.length > 0 ? (
            games.map((game, index) => {
              const awayWinner = game.game.away_score > game.game.home_score;
              const homeWinner = game.game.home_score > game.game.away_score;

              // Verificar se o time do jogador é o time vencedor
              const isAwayWinner =
                team === game.game.away_team.abbr && awayWinner;
              const isHomeWinner =
                team === game.game.home_team.abbr && homeWinner;

              return (
                <tr key={index} className="border-t">
                  <td className="px-1 py-1 text-center">
                    <span
                      className={`font-bold ${
                        isAwayWinner
                          ? "text-green-500"
                          : isHomeWinner
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {isAwayWinner || isHomeWinner ? "W" : "L"}
                    </span>
                  </td>
                  <td className="px-1 py-1">
                    <div className="flex items-center justify-center">
                      <Image
                        src={game.game.away_team.url}
                        alt={game.game.away_team.name}
                        width={8}
                        height={8}
                        className="w-8 h-8 object-cover rounded-full mr-2"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="px-1 py-1 text-center">
                    <span
                      className={
                        team === game.game.away_team.abbr ? "font-bold" : ""
                      }
                    >
                      {String(game.game.away_score).padStart(2, "0")}
                    </span>
                    {" x "}
                    <span
                      className={
                        team === game.game.home_team.abbr ? "font-bold" : ""
                      }
                    >
                      {String(game.game.home_score).padStart(2, "0")}
                    </span>
                  </td>

                  <td className="px-1 py-1">
                    <div className="flex items-center justify-center">
                      <Image
                        src={game.game.home_team.url}
                        alt={game.game.home_team.name}
                        width={8}
                        height={8}
                        className="w-8 h-8 object-cover rounded-full mr-2"
                        unoptimized
                      />
                    </div>
                  </td>
                  {isQB && (
                    <td className="px-1 py-1 text-center">
                      {game.completions}
                    </td>
                  )}
                  {isQB && (
                    <td className="px-1 py-1 text-center">{game.attempts}</td>
                  )}
                  {isQB && (
                    <td className="px-1 py-1 text-center">
                      {game.passing_yards}
                    </td>
                  )}
                  {isQB && (
                    <td className="px-1 py-1 text-center">
                      {game.interceptions}
                    </td>
                  )}
                  {isQB && (
                    <td className="px-1 py-1 text-center">
                      {game.passing_tds}
                    </td>
                  )}
                  <td className="px-1 py-1 text-center">{game.carries}</td>
                  <td className="px-1 py-1 text-center">
                    {game.rushing_yards}
                  </td>
                  <td className="px-1 py-1 text-center">{game.rushing_tds}</td>
                  {!isQB && (
                    <td className="px-1 py-1 text-center">{game.receptions}</td>
                  )}
                  {!isQB && (
                    <td className="px-1 py-1 text-center">{game.targets}</td>
                  )}
                  {!isQB && (
                    <td className="px-1 py-1 text-center">
                      {game.receiving_yards}
                    </td>
                  )}
                  {!isQB && (
                    <td className="px-1 py-1 text-center">
                      {game.receiving_tds}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="px-1 py-1 text-center">
                Não há jogos disponíveis
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GamesTable;
