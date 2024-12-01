from typing import List
from models.playerWeekStats import PlayerWeekStats

class Player:
    def __init__(self, name: str, position: str, team: str, img: str, games:List[PlayerWeekStats]):
        self.name = name
        self.position = position
        self.team = team
        self.img = img
        
        # stats
        self.games = games
        # self.pass_td = 0
        # self.pass_yds = 0
        # self.sacks_taken = 0
        # self.int_taken = 0
        # self.att = 0
        # self.comp = 0
        # self.rush_yds = 0
        # self.rush_td = 0
        # self.carries = 0
        # self.rec = 0
        # self.rec_yds = 0
        # self.rec_td = 0
        # self.targets = 0
        # self.tackles = 0
        # self.solo_tackles = 0
        # self.assists = 0
        # self.sacks_made = 0
        # self.fg_made = 0
        # self.fg_att = 0
        # self.qb_hits = 0
        # self.int_made = 0
        
    def to_dict_games(self):
        return {
            'name': self.name,
            'position': self.position,
            'team': self.team,
            'img': self.img,
            'games': [game.to_dict() for game in self.games]
            # 'pass_td': self.pass_td,
            # 'pass_yds': self.pass_yds,
            # 'sacks_taken': self.sacks_taken,
            # 'int_taken': self.int_taken,
            # 'att': self.att,
            # 'comp': self.comp,
            # 'rush_yds': self.rush_yds,
            # 'rush_td': self.rush_td,
            # 'carries': self.carries,
            # 'rec': self.rec,
            # 'rec_yds': self.rec_yds,
            # 'rec_td': self.rec_td,
            # 'targets': self.targets,
            # 'tackles': self.tackles,
            # 'solo_tackles': self.solo_tackles,
            # 'assists': self.assists,
            # 'sacks_made': self.sacks_made,
            # 'fg_made': self.fg_made,
            # 'fg_att': self.fg_att,
            # 'qb_hits': self.qb_hits,
            # 'int_made': self.int_made
        }
        
    def to_dict(self):
        return {
            'name': self.name,
            'position': self.position,
            'team': self.team,
            'img': self.img,
        }
        
    def show_info(self):
        print(f"{self.name} - {self.position}")