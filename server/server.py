# from dotenv import load_dotenv
import nfl_data_py as nfl # type: ignore
import json
import os
import pandas as pd
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

# print(nfl.import_seasonal_data([2023]))
# print(teams.columns)

# Inspecionar URLs dos logotipos
# for index, team in teams.iterrows():
#     logo_url = team.get('team_logo_espn')
#     team_name = team.get('team_name')
#     print(f"Team: {team_name}, Logo URL: {logo_url}")

# print(dir(nfl))

# Importar dados de elencos semanais para 2023
# weekly_rosters_2023 = nfl.import_weekly_rosters([2023]).drop_duplicates(subset=['player_id'])

# Filtrar jogadores dos Kansas City Chiefs (abreviação KC)
# chiefs_players = weekly_rosters_2023[weekly_rosters_2023['team'] == 'KC'].drop_duplicates(subset=['player_id'])

# for index, player in chiefs_players.iterrows():
#     headshot_url = player.get('headshot_url')
#     player_name = player.get('player_name')
#     print(f"Player: {player_name}, URL: {headshot_url}")

# # Exibir os primeiros jogadores dos Chiefs
# print(chiefs_players.head())

# # Verificar as colunas disponíveis
# print(weekly_rosters_2023.columns)

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

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

teams = pd.DataFrame(load_data('teams'))
players = pd.DataFrame(load_data('players'))
stats = pd.DataFrame(load_data('stats'))
games = pd.DataFrame(load_data('games'))
weekly_stats = pd.DataFrame(load_data('weekly_stats'))

@app.route("/info")
def get_info():
    num = int(request.args.get('num'))
    # player_find = list(players.find().skip(num).limit(1))[0]
    player = players.iloc[num]
    name = player['player_name']
    team = player['team']
    img = player['headshot_url']
    team_img = teams[teams['team_abbr'] == player['team']]['team_logo_espn'].values[0]
    player = {'name': name, 'team': team, 'img': img, 'team_img': team_img}
    return player

@app.route("/games")
def get_games():
    num = int(request.args.get('num'))
    player = players.iloc[num]
    games_player = weekly_stats[weekly_stats['player_id'] == player['player_id']]['opponent_team']
    print(games_player.values.tolist())
    data = games_player.values.tolist()
    return data

if __name__ == "__main__":
    app.run(debug=True)