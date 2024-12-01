import pytest

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from server_v2 import load_data, find_team_by_abbr, find_player_by_name
from models.team import Team
from models.player import Player

def test_load_data_valid_file():
    data = load_data('games')
    assert data is not None
    assert isinstance(data, list)

def test_load_data_invalid_file():
    data = load_data('jogos')
    assert data is None

def test_find_team_by_abbr_found():
    teams = [Team(name="Team A", abbr="TA", url="url_a"), Team(name="Team B", abbr="TB", url="url_b")]
    team = find_team_by_abbr(teams, 'TA')
    assert team is not None
    assert team.name == "Team A"

def test_find_team_by_abbr_not_found():
    teams = [Team(name="Team A", abbr="TA", url="url_a")]
    team = find_team_by_abbr(teams, 'XX')
    assert team is None

def test_find_player_by_name_found():
    p1 = Player(name="John Doe", team="TA", img="abc", games=[], position="QB")
    p2 = Player(name="Jane Roe", team="TB", img="def", games=[], position="RB")
    players = [p1, p2]
    player = find_player_by_name(players, "John Doe")
    assert player is not None
    assert player.name == "John Doe"

def test_find_player_by_name_not_found():
    p = Player(name="John Doe", team="TA", img="abc", games=[], position="QB")
    players = [p]
    player = find_player_by_name(players, "Jane Roe")
    assert player is None
