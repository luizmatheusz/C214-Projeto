# from dotenv import load_dotenv
# import nfl_data_py as nfl # type: ignore
import json
import os
# import pandas as pd
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

from models.game import Game
from models.player import Player
from models.team import Team
from models.playerWeekStats import PlayerWeekStats

def load_data(name):
    file_name = f"./data/{name}.json"
    file_path = os.path.join(os.getcwd(), file_name)

    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"Arquivo '{file_name}' não encontrado.")
        return None
    except json.JSONDecodeError:
        print(f"Erro ao decodificar o JSON no arquivo '{file_name}'.")
        return None
    
def find_team_by_abbr(teams, abbr):
    for team in teams:
        if team.abbr.lower() == abbr.lower():
            return team
    return None

def find_player_by_name(players, name):
    for player in players:
        if player.name.lower() == name.lower():
            return player
    return None

def find_game_by_teams_and_week(games, team1, team2, week):
    for game in games:
        game:Game = game
        if game.home_team.abbr.lower() in [team1.lower(), team2.lower()] and game.away_team.abbr.lower() in [team1.lower(), team2.lower()] and game.week == week:
            return game
    return None


def start():
    players_json = load_data('players')
    games_json = load_data('games')
    teams_json = load_data('teams')
    weekly_stats_json = load_data('weekly_stats')
    players = []
    teams = []
    games = []

    for team in teams_json:
        teams.append(Team(name=team['team_name'], abbr=team['team_abbr'], url=team['team_logo_espn']))
            
    for game in games_json:
        home_team = find_team_by_abbr(teams=teams, abbr=game['home_team'])
        away_team = find_team_by_abbr(teams=teams, abbr=game['away_team'])
        games.append(Game(home_team=home_team,away_team=away_team,home_score=game['home_score'],
                        away_score=game['away_score'],gameday=game['gameday'],week=game['week'],season=game['season'],
                        game_type=game['game_type'],espn=game['espn'],game_id=game['game_id']))
        
    for player in players_json:
        if player['status'] == "ACT":
            player_games = []
            for game in weekly_stats_json:
                if game['player_display_name'] == player['player_name']:
                    player_game = find_game_by_teams_and_week(games=games, team1=game['recent_team'], team2=game['opponent_team'], week=game['week'])
                    player_games.append(PlayerWeekStats(
                        tds=game['rushing_tds'], 
                        rushing_yards=game['rushing_yards'], 
                        receiving_yards=game['receiving_yards'], 
                        attempts=game['attempts'], 
                        completions=game['completions'], 
                        passing_yards=game['passing_yards'], 
                        interceptions=game['interceptions'], 
                        passing_tds=game['passing_tds'],
                        carries=game['carries'], 
                        rushing_tds=game['rushing_tds'], 
                        receptions=game['receptions'], 
                        targets=game['targets'], 
                        receiving_tds=game['receiving_tds'],
                        game=player_game
                    ))
            players.append(Player(name=player['player_name'], position=player['position'], team=player['team'], img=player['headshot_url'], games=player_games))
        
    for team in teams:
        players_team = list(filter(lambda player: player.team == team.abbr, players))
        
        for player in players_team:
            team.add_player(player)        
            
    return teams,players,games

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

teams, players, games = start()

@app.route("/info")
def get_info():
    num = int(request.args.get('num'))
    # player_find = list(players.find().skip(num).limit(1))[0]
    player:Player = players[num]
    name = player.name
    team = player.team
    img = player.img
    player_team:Team = find_team_by_abbr(teams=teams, abbr=player.team)
    # team_img = teams[teams['team_abbr'] == player['team']]['team_logo_espn'].values[0]
    team_img = player_team.url
    player = {'name': name, 'team': team, 'img': img, 'team_img': team_img}
    return player


@app.route("/games")
def get_games():
    team_abbr = request.args.get('team')
    team:Team = find_team_by_abbr(teams=teams, abbr=team_abbr)
    
    team_games = []
    
    for game in games:
        game:Game = game
        if team.abbr == game.home_team.abbr or team.abbr == game.away_team.abbr:
            team_games.append(game.to_dict(roster=False))
            
    return team_games

@app.route("/teams")
def get_teams():
    teams_list = []
    for team in teams:
        team:Team = team
        teams_list.append({"name": team.name, "abbr": team.abbr, "url": team.url})
    return jsonify(teams_list)

@app.route("/roster")
def get_roster():
    team_abbr = request.args.get('team')
    team:Team = find_team_by_abbr(teams=teams, abbr=team_abbr)
    
    if team is None:
        return {"error": "Time não encontrado"}, 404
    
    return team.to_dict_roster()['roster']

@app.route("/player")
def get_player():
    player_name = request.args.get('name')
    player:Player = find_player_by_name(players=players, name=player_name)
    
    return player.to_dict_games()['games']

@app.route("/test")
def test():
    return "Servidor está ativo"

if __name__ == "__main__":
    app.run(debug=True)

