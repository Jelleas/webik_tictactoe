function setTile(game, x, y) {
    if (game.board[x][y] != 0) {
        return;
    }

    game.board[x][y] = game.turn ? 1 : 2;
    game.turn = !game.turn;
}

function main() {
    let game = {
        turn: true,
        board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }

    let tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, i) => {
        let x = i % 3;
        let y = Math.floor(i / 3);

        tile.addEventListener("click", function(event) {
            setTile(game, x, y);
            this.innerHTML = game.board[x][y] == 1 ? "X" : "O";
        });

        tile.addEventListener("mouseover", function(event) {
            if (game.board[x][y]) {
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
