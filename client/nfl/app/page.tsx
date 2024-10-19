"use client";
import { useEffect, useState } from "react";
import Player from "./Player";

export default function Home() {
  const [player, setPlayer] = useState({}); // Inicialize como um objeto vazio
  const [i, setI] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoResponse = await fetch(
          `http://localhost:5000/info?num=${i}` // Corrige a barra dupla na URL
        );
        const infoData = await infoResponse.json();
        setPlayer(infoData); // Atualize o estado com o objeto retornado
      } catch (error) {
        console.error("Erro na solicitação de dados do jogador", error);
      }
    };

    fetchData();
  }, [i]);

  const handleButtonClick = () => {
    setI(i + 1); // Incrementa o valor de `i` quando o botão é clicado
  };

  return (
    <div className="bg-white w-full h-screen text-black">
      <div>
        {/* Verifique se o player não está vazio antes de renderizar */}
        {player && <Player player={player} />}
      </div>
      <button
        onClick={handleButtonClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Próximo Jogador
      </button>
    </div>
  );
}
