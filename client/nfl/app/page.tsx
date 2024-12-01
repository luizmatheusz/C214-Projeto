"use client";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import TeamSelector from "./TeamSelector";
import GamesTable from "./GamesTable"; // Certifique-se de importar corretamente
import { Game } from "./GameCard";
import Image from "next/image";

interface Team {
  name: string;
  abbr: string;
  url: string;
}

interface Player {
  name: string;
  img: string;
  team: string;
  position: string;
}

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [roster, setRoster] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [i, setI] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    console.log("Valor de games:", games);
  }, [games]);

  useEffect(() => {
    const fetchData = async () => {
      if (roster[i]) {
        try {
          const response = await fetch(
            `http://localhost:5000/player?name=${roster[i].name}`
          );
          const data = await response.json();
          setGames(data);
        } catch (error) {
          console.error("Erro ao buscar o elenco do time:", error);
        }
      }
    };

    fetchData();
  }, [i, roster]);

  useEffect(() => {
    if (roster.length > 0) {
      setPlayer(roster[i]);
    }
  }, [i, roster]);

  useEffect(() => {
    if (selectedTeam) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/roster?team=${selectedTeam.abbr}`
          );
          const data = await response.json();
          setRoster(data);
          setPlayer(data[0]);
          setI(0);
        } catch (error) {
          console.error("Erro ao buscar o elenco do time:", error);
        }
      };

      fetchData();
    }
  }, [selectedTeam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoResponse = await fetch(`http://localhost:5000/teams`);
        const teamsData = await infoResponse.json();
        setTeamsList(teamsData);
      } catch (error) {
        console.error("Erro na solicitação da lista de times", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    setI((prevI) => (prevI + 1) % roster.length);
  };

  const filteredPlayers = roster
    .filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleSelectPlayer = (player: Player) => {
    // Encontrar o índice do jogador no vetor roster
    const playerIndex = roster.findIndex((p) => p.name === player.name);

    if (playerIndex !== -1) {
      // Se o jogador for encontrado, você pode usar playerIndex
      setI(playerIndex);
      setSearchTerm(player.name);
      setShowResults(false); // Esconde os resultados após a seleção
      console.log("Jogador selecionado:", player);
      console.log("Índice do jogador:", playerIndex);
    } else {
      console.log("Jogador não encontrado no elenco.");
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    // <div className="bg-white min-h-screen w-full h-screen text-black flex flex-col overflow-auto">
    <div className="bg-white w-full h-screen text-black overflow-auto flex flex-col">
      <div className="flex items-center space-x-4 mb-4 justify-center ">
        <Image
          className="w-28 h-28 object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" // Logo da NFL
          alt="Logo da NFL"
          width={28}
          height={28}
          unoptimized
        />
        <h1 className="text-3xl font-bold">Estatísticas da NFL</h1>
      </div>

      <TeamSelector teams={teamsList} onSelectTeam={setSelectedTeam} />

      <input
        type="text"
        placeholder="Digite o nome do jogador"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={handleBlur}
        className="border border-gray-300 p-2 rounded w-full"
      />

      {showResults &&
        filteredPlayers.slice(0, 5).map((player, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                console.log("Jogador selecionado:", player);
                handleSelectPlayer(player);
              }}
              className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
            >
              {/* Foto do jogador */}
              <Image
                src={player.img} // Substitua pelo caminho da imagem
                alt={player.name}
                width={16}
                height={14}
                className="w-16 h-14 rounded-full mr-2" // Tamanho da foto e margem à direita
                unoptimized
              />
              {/* Nome do jogador */}
              {player.name}
            </div>
          );
        })}

      <div>
        {player ? <Player player={player} /> : "Nenhum jogador selecionado"}
        {games && games.length > 0 ? (
          <GamesTable
            games={games}
            team={player?.team}
            position={player?.position}
          />
        ) : (
          "Não há jogos"
        )}
        {/* {games && games.length > 0 ? <Games games={games} /> : "Não há jogos"} */}
      </div>

      <button
        onClick={handleButtonClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-[20%]"
      >
        Próximo Jogador
      </button>
    </div>
  );
}
