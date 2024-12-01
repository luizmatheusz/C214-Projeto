"use client"; // Certifique-se de que este componente é renderizado no lado do cliente

import React, { useState } from "react";
import Image from "next/image";

interface Team {
  name: string;
  abbr: string;
  url: string;
}

interface TeamSelectorProps {
  teams: Team[]; // Recebe os itens como props
  onSelectTeam: (team: Team | null) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, onSelectTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (team: Team) => {
    setSelectedTeam(team);
    setIsOpen(false);
    handleSelectTeam(team);
  };

  const handleSelectTeam = (team: Team) => {
    onSelectTeam(team); // Chama a função passada como prop com o time selecionado
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 bg-transparent text-black rounded-md shadow-md focus:outline-none"
      >
        {selectedTeam ? (
          <>
            <Image
              src={selectedTeam.url}
              alt={selectedTeam.name}
              className="w-16 h-16 object-cover rounded-full"
              width={16}
              height={16}
              unoptimized
            />
            {/* <span>{selectedTeam.abbr}</span> */}
          </>
        ) : (
          <span>Selecione um time...</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-1 bg-white rounded-lg shadow-lg flex flex-wrap w-[99%]">
          {teams.map((team) => (
            <button
              key={team.abbr}
              onClick={() => handleItemClick(team)}
              className="flex items-center justify-center p-2 w-1/8 hover:bg-gray-100" // Ajuste w-1/12 para controlar a largura de cada botão
            >
              <Image
                src={team.url}
                alt={team.name}
                width={16}
                height={16}
                className="w-16 h-16 object-cover rounded-full" // Ajuste o tamanho da imagem conforme necessário
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelector;
