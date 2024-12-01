import pytest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from server_v2 import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_get_info(client):
    response = client.get("/info?num=0")
    assert response.status_code == 200
    data = response.get_json()
    assert "name" in data
    assert "team" in data
    assert "img" in data
    assert "team_img" in data
    
def test_get_teams(client):
    response = client.get("/teams")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    for team in data:
        assert "name" in team
        assert "abbr" in team
        assert "url" in team

def test_get_roster(client):
    response = client.get("/roster?team=SF")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)  # Deve retornar uma lista de jogadores
    if data:  # Se houver jogadores, verificar a estrutura
        assert "name" in data[0]
        assert "team" in data[0]

def test_get_player(client):
    response = client.get("/player?name=Nick%20Cross")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)  # Deve retornar os jogos do jogador
    if data:  # Se houver jogos, verificar a estrutura
        assert "tds" in data[0]
        assert "passing_yards" in data[0]

def test_server_status(client):
    response = client.get("/test")
    assert response.status_code == 200
    assert response.data.decode() == "Servidor está ativo"