function setTile(game, x, y) {
    if (game.board[x][y] != 0) {
        return;
    }

    game.board[x][y] = game.turn ? 1 : 2;
    game.turn = !game.turn;
}

function hasEnded(game) {
    let isWinningSeq = (a, b, c) => a !== 0 && a === b && b === c;

    for (let i = 0; i < 3; i++) {
        if (isWinningSeq(game.board[i][0], game.board[i][1], game.board[i][2])) {
            return true;
        }
        if (isWinningSeq(game.board[0][i], game.board[1][i], game.board[2][i])) {
            return true;
        }
    }

    if (isWinningSeq(game.board[0][0], game.board[1][1], game.board[2][2])) {
        return true;
    }
    if (isWinningSeq(game.board[2][0], game.board[1][1], game.board[0][2])) {
        return true;
    }

    return false;
}

function main() {
    let game = {
        turn: true,
        board: [[0,0,0], [0,0,0], [0,0,0]]
    };

    let tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, i) => {
        let x = i % 3;
        let y = Math.floor(i / 3);

        tile.addEventListener("click", function(event) {
            if (!hasEnded(game)) {
                setTile(game, x, y);
                this.innerHTML = game.board[x][y] == 1 ? 'X' : 'O';
                if (hasEnded(game)) {
                    document.querySelector("#status").innerHTML = "game over!";
                }
            }
        });

        tile.addEventListener("mouseover", function(event) {
            if (game.board[x][y] != 0) {
                this.style.color = "red";
            }
        });

        tile.addEventListener("mouseleave", function(event) {
            this.style.color = "black";
        });
    });
}

document.addEventListener('DOMContentLoaded', function(event) {
    main();
})