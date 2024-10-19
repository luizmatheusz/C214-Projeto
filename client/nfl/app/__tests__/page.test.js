import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Home from "../page"; // Ajuste o caminho conforme necessário

// Mock da função fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: "Jogador 1",
          team: "Time A",
          img: "http://example.com/jogador.jpg",
          team_img: "http://example.com/time-a.jpg",
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks(); // Limpa os mocks após cada teste
});

test("deve renderizar o jogador recebido do servidor", async () => {
  await act(async () => {
    render(<Home />);
  });

  // Verifica se o nome do jogador aparece na tela
  const playerName = await screen.findByText("Jogador 1");
  expect(playerName).toBeInTheDocument();
});

test("deve buscar um novo jogador ao clicar no botão", async () => {
  await act(async () => {
    render(<Home />);
  });

  // Clica no botão "Próximo Jogador"
  const button = screen.getByText("Próximo Jogador");

  await act(async () => {
    fireEvent.click(button);
  });

  // Verifica se a fetch foi chamada novamente (se necessário)
  expect(global.fetch).toHaveBeenCalledTimes(2);

  // Verifica se o novo jogador aparece na tela
  const playerName = await screen.findByText("Jogador 1"); // Ajuste conforme necessário para o próximo jogador
  expect(playerName).toBeInTheDocument();
});
