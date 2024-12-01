from models.team import Team

class Game:
    def __init__(self, home_team: Team, away_team: Team, home_score: float, away_score: float,
                 gameday: str, week: int, season: int, game_type: str, espn: str, game_id: str
                ):
        self.home_team = home_team
        self.away_team = away_team
        self.home_score = int(home_score)
        self.away_score = int(away_score)
        self.gameday = gameday
        self.week = week
        self.season = season
        self.game_type = game_type
        self.espn = espn
        self.game_id = game_id
        self.winner = home_team if home_score > away_score else away_team
        self.total_score = self.home_score + self.away_score
        
    def to_dict(self):
        data = {
            'home_team': self.home_team.to_dict(),
            'away_team': self.away_team.to_dict(),
            'home_score': self.home_score,
            'away_score': self.away_score,
            'gameday': self.gameday,
            'week': self.week,
            'season': self.season,
            'game_type': self.game_type,
            'espn': self.espn,
            'game_id': self.game_id,
            'winner': self.winner.to_dict(),
            'total_score': self.total_score
        }
        
        
        
        return data
        
    def __repr__(self):
        return (f"Game({self.gameday}, Week {self.week}, {self.season}, {self.game_type}):\n"
                f"  Home: {self.home_team.name} ({self.home_score})\n"
                f"  Away: {self.away_team.name} ({self.away_score})\n"
                f"  Winner: {self.winner.name}\n"
                f"  Total Score: {self.total_score}\n"
                f"  ESPN Link: {self.espn}\n"
                f"  Game ID: {self.game_id}\n")
        
        