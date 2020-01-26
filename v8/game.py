PLAYER_TO_GAME = {}


def new_game():
    return {
        "turn": True,
        "board": [[0] * 3 for i in range(3)],
        "players": []
    }


def get_game(player):
    return PLAYER_TO_GAME.get(player, None)


def join_game(player):
    # Already in a game, don't join
    if get_game(player):
        return

    # Try to join an existing game
    for game in PLAYER_TO_GAME.values():
        if len(game["players"]) < 2:
            game["players"].append(player)
            PLAYER_TO_GAME[player] = game
            return

    # Otherwise start a new game
    game = new_game()
    game["players"].append(player)
    PLAYER_TO_GAME[player] = game


def set_tile(game, player, x, y):
    # Game has not started yet
    if len(game["players"]) < 2:
        return False

    # Tile is already filled
    if game["board"][x][y] != 0:
        return False

    # It's not your turn
    if game["players"][0 if game["turn"] else 1] != player:
        print(game["players"], player)
        return False

    # Fill tile
    game["board"][x][y] = 1 if game["turn"] else 2;
    game["turn"] = not game["turn"];

    return True
