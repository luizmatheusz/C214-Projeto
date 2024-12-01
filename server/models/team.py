from models.player import Player


class Team:
    def __init__(self, name: str, abbr:str, url: str):
        self.name = name
        self.abbr = abbr
        self.url = url
        self.roster = []
        
    def to_dict_roster(self):
        data = {
            'name': self.name,
            'abbr': self.abbr,
            'url': self.url,
            'roster': [player.to_dict() for player in self.roster]
        }
            
        return data
    
    def to_dict(self):
        data = {
            'name': self.name,
            'abbr': self.abbr,
            'url': self.url,
        }
            
        return data
        
    def add_player(self, player: Player):
        self.roster.append(player)
        # print(f"{player.name} foi adicionado ao {self.name}!")
        
    def show_info(self):
        print(f"Team: [{self.abbr}] {self.name}")