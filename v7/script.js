function draw(board) {
    let tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, i) => {
       let x = i % 3;
       let y = Math.floor(i / 3);

       if (board[x][y] == 1) {
           tile.innerHTML = "X";
       }
       else if (board[x][y] == 2) {
           tile.innerHTML = "O";
       }
    });
}

function main() {
    let socket = io();

    socket.on("moved", data => {
        draw(data["board"]);
    });

    let tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, i) => {
        let x = i % 3;
        let y = Math.floor(i / 3);

        tile.addEventListener("click", function(event) {
            socket.emit("move", {"x": x, "y": y});
        });

        tile.addEventListener("mouseover", function(event) {
            if (this.innerHTML) {
                this.style.color = "red";
            }
        });

        tile.addEventListener("mouseleave", function(event) {
            this.style.color = "black";
        });
    });

    setInterval(() => {
        fetch("/api/status")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                draw(json.board);
            });
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function(event) {
    main();
})