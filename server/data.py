from dotenv import load_dotenv
import nfl_data_py as nfl # type: ignore
import json
import os
import pandas as pd
from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from pymongo.mongo_client import MongoClient # type: ignore

# print(nfl.import_seasonal_data([2023]))
# print(teams.columns)

# Inspecionar URLs dos logotipos
# for index, team in teams.iterrows():
#     logo_url = team.get('team_logo_espn')
#     team_name = team.get('team_name')
#     print(f"Team: {team_name}, Logo URL: {logo_url}")

# print(dir(nfl))

path = "./data/"

def get_data(file_name):
    file_path = path + file_name + ".json"
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
            
            return data
        
        except json.JSONDecodeError:
            print("Erro ao decodificar o JSON.")
        except Exception as e:
            print(f"Ocorreu um erro: {e}")
    else:
        print(f"O arquivo '{file_name}' não existe.")

def save_data(file_name, function):
    try:
        # stats = nfl.import_seasonal_data(years).drop_duplicates(subset=['player_id'])
        data = function
        data_json = data.to_json(orient='records', indent=4)
        with open(path + file_name + '.json', 'w') as f:
            f.write(data_json)
        print(f"Os {file_name} foram salvos com sucesso.")
    except:
        print(f"Erro ao salvar os {file_name}.")

def init():
    try:
        teams = get_data("teams")
        players = get_data("players")
        stats = get_data("stats")
        weekly_stats = get_data("weekly_stats")
        games = get_data("games")
        return teams, players, stats, weekly_stats, games
        
    except:
        print("Erro ao carregar os dados.")
        
def data_to_db(file_name, collection):
    file_name = file_name + '.json'
    # Definir o campo identificador com base no nome do arquivo
    if file_name == 'teams.json':
        identifier_field = 'team_name'
    elif file_name == 'players.json':
        identifier_field = 'player_name'
    elif file_name == 'stats.json':
        identifier_field = 'player_id'
    elif file_name == 'weekly_stats.json':
        # Usando uma lista de identificadores
        identifier_field = ['player_id', 'season', 'week', 'opponent_team']
    elif file_name == 'games.json':
        identifier_field = 'game_id'
    else:
        print("Nome de arquivo não reconhecido.")
        return

    # Contadores para rastrear as operações
    inserted_count = 0
    updated_count = 0
    no_update_count = 0

    # Ler e processar dados do JSON no MongoDB
    try:
        # Abre e lê o arquivo JSON
        with open(path + file_name, 'r') as file:
            data = json.load(file)
            
            # Verifica se o JSON é uma lista de documentos
            if isinstance(data, list):
                # Itera sobre cada documento com o índice
                for index, document in enumerate(data):
                    try:
                        # Construir a query com base no tipo de identificador
                        if isinstance(identifier_field, list):
                            # Construir um dicionário com múltiplos identificadores
                            query = {field: document[field] for field in identifier_field}
                        else:
                            # Usar um identificador simples
                            query = {identifier_field: document[identifier_field]}

                        # Verifica se o documento já existe
                        existing_document = db[collection].find_one(query)

                        if existing_document:
                            # Comparar o documento existente com o novo documento
                            if existing_document != document:
                                # Atualiza o documento se houver diferenças
                                result = db[collection].update_one(
                                    query,
                                    {'$set': document}
                                )
                                if result.modified_count > 0:
                                    print(f"{index} - Documento atualizado.")
                                    updated_count += 1
                            else:
                                print(f"{index} - Documento não necessita de atualização.")
                                no_update_count += 1
                        else:
                            # Insere o novo documento se não existir
                            result = db[collection].insert_one(document)
                            print(f"{index} - Documento inserido.")
                            inserted_count += 1

                    except Exception as e:
                        print(f"Ocorreu um erro ao processar o documento no índice {index}: {e}")
            else:
                print("O JSON deve ser uma lista de documentos.")
    except FileNotFoundError:
        print(f"O arquivo '{file_name}' não foi encontrado.")
    except json.JSONDecodeError:
        print("Erro ao decodificar o JSON.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

    # Exibe o resumo das operações
    print(f"Total de documentos inseridos: {inserted_count}")
    print(f"Total de documentos atualizados: {updated_count}")
    print(f"Total de documentos não necessitando de atualização: {no_update_count}")

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

load_dotenv()
admin = os.getenv('MONGODB_USERNAME')
password = os.getenv('MONGODB_PASSWORD')

uri = "mongodb+srv://" + admin + ":" + password + "@nbascrapping.lwgvvvs.mongodb.net/?retryWrites=true&w=majority&appName=NBAScrapping"
client = MongoClient(uri)

db = client['NFL']

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# # Buscar todos os documentos da coleção
# try:
#     # Encontrar todos os documentos
#     documents = players_db.find()
    
#     # Exibir documentos
#     for doc in documents:
#         print(doc)

# except Exception as e:
#     print(f"Ocorreu um erro: {e}")

# finally:
#     # Fecha a conexão com o MongoDB
#     client.close()

teams, players, stats, weekly_stats, games = init()

# Menu
while True:
    print("Menu:")
    print("0. Sair")
    print("1. Salvar dados dos times")
    print("2. Salvar dados dos jogadores")
    print("3. Salvar stats dos jogadores")
    print("4. Salvar stats semanais dos jogadores")
    print("5. Salvar jogos")
    print("6. Subir dados para o banco")
    # print("5. Ver jogador")
    # print("5. Conferir resultados de uma rodada")
    # print("6. Analise de uma rodada")
    
    menu = str(input("Digite a opcao desejada: "))

    if menu == '0':
        client.close()
        break

    if menu == '1':
        save_data("teams", nfl.import_team_desc())
        
    if menu == '2':
        save_data("players", nfl.import_weekly_rosters([2023]).drop_duplicates(subset=['player_id']))
        
    if menu == '3':
        save_data("stats", nfl.import_seasonal_data([2023]).drop_duplicates(subset=['player_id']))
        
    if menu =='4':
        save_data("weekly_stats", nfl.import_weekly_data([2023]))
        # print(test)
        # print(test.columns)
        
    if menu == '5':
        save_data("games", nfl.import_schedules([2023]))
        # print(test)
        # print(test.columns)
        
    if menu == '6':
        data_to_db("teams", "teams")
        data_to_db("players", "players")
        data_to_db("stats", "stats")
        data_to_db("weekly_stats", "weekly_stats")
        data_to_db("games", "games")