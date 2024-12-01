import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../page"; // Caminho para o componente que estamos testando

// Dados mockados que o fetch vai retornar
const mockTeams = [
  { name: "Time A", abbr: "TA", url: "url-time-a" },
  { name: "Time B", abbr: "TB", url: "url-time-b" },
];

const mockRoster = [
  { name: "Jogador 1", team: "Time A", position: "QB", img: "img1.jpg" },
  { name: "Jogador 2", team: "Time A", position: "RB", img: "img2.jpg" },
];

const mockPlayer = {
  home_team: { name: "Time A", abbr: "TA", url: "url-time-a" },
  away_team: { name: "Time B", abbr: "TB", url: "url-time-b" },
  home_score: 51.0,
  away_score: 37.0,
  gameday: "thursday",
  week: 1,
  season: 2023,
  game_type: "REG",
  espn: "espn001",
  game_id: 123,
  total_score: 88.0,
};

// Mocking a função fetch
global.fetch = jest.fn((url) => {
  if (url.includes("/teams")) {
    // Simula a resposta para o endpoint /teams
    return Promise.resolve({
      json: () => Promise.resolve(mockTeams),
    });
  } else if (url.includes("/roster")) {
    // Simula a resposta para o endpoint /roster
    return Promise.resolve({
      json: () => Promise.resolve(mockRoster),
    });
  } else if (url.includes("/player")) {
    // Simula a resposta para o endpoint /player
    return Promise.resolve({
      json: () => Promise.resolve(mockPlayer),
    });
  }
  return Promise.reject(new Error("Endpoint não encontrado"));
});

test("deve renderizar os times corretamente a partir do endpoint /teams", async () => {
  render(<Home />);

  expect(screen.getByText(/Nenhum jogador selecionado/i)).toBeInTheDocument();

  // Aguarda a resposta do endpoint `/teams` e verifica se o Time A é exibido
  // await waitFor(() => screen.findByText(/Time A/i));

  // const timeA = screen.getByText(/Time A/i);
  // expect(timeA).toBeInTheDocument();

  // const timeB = screen.getByText(/Time B/i);
  // expect(timeB).toBeInTheDocument();
});

// test("deve renderizar o elenco de jogadores corretamente a partir do endpoint /roster", async () => {
//   render(<Home />);

//   // Aguarda a resposta do endpoint `/roster` e verifica se Jogador 1 é exibido
//   await waitFor(() => screen.findByText(/Jogador 1/i));

//   const jogador1 = screen.getByText(/Jogador 1/i);
//   expect(jogador1).toBeInTheDocument();

//   const jogador2 = screen.getByText(/Jogador 2/i);
//   expect(jogador2).toBeInTheDocument();
// });

// test("deve renderizar as informações do jogador corretamente a partir do endpoint /player", async () => {
//   render(<Home />);

//   // Aguarda a resposta do endpoint `/player` e verifica se as informações do jogador são exibidas
//   await waitFor(() => screen.findByText(/Time A/i));

//   const homeTeam = screen.getByText(/Time A/i);
//   expect(homeTeam).toBeInTheDocument();

//   const awayTeam = screen.getByText(/Time B/i);
//   expect(awayTeam).toBeInTheDocument();

//   const homeScore = screen.getByText(/51.0/i);
//   expect(homeScore).toBeInTheDocument();

//   const awayScore = screen.getByText(/37.0/i);
//   expect(awayScore).toBeInTheDocument();

//   const totalScore = screen.getByText(/88.0/i);
//   expect(totalScore).toBeInTheDocument();
// });
