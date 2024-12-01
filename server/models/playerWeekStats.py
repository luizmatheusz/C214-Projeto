class PlayerWeekStats:
    def __init__(self, tds: int, rushing_yards: float, receiving_yards: float, attempts: int, completions: int,
                 passing_yards: float, interceptions: float, passing_tds: int, carries: int, rushing_tds: int, 
                 receptions: int, targets: int, receiving_tds: int, game):
        from models.game import Game
        self.tds = tds
        self.rushing_yards = rushing_yards
        self.receiving_yards = receiving_yards
        self.attempts = attempts
        self.completions = completions
        self.passing_yards = passing_yards
        self.interceptions = interceptions
        self.passing_tds = passing_tds
        self.carries = carries
        self.rushing_tds = rushing_tds
        self.receptions = receptions
        self.targets = targets
        self.receiving_tds = receiving_tds
        self.game:Game = game
        
    def to_dict(self):
        return {
            'tds': self.tds,
            'rushing_yards': self.rushing_yards,
            'receiving_yards': self.receiving_yards,
            'attempts': self.attempts,
            'completions': self.completions,
            'passing_yards': self.passing_yards,
            'interceptions': self.interceptions,
            'passing_tds': self.passing_tds,
            'carries': self.carries,
            'rushing_tds': self.rushing_tds,
            'receptions': self.receptions,
            'targets': self.targets,
            'receiving_tds': self.receiving_tds,
            'game': self.game.to_dict()
        }