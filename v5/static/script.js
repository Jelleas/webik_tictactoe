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
    let tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, i) => {
        let x = i % 3;
        let y = Math.floor(i / 3);

        tile.addEventListener("click", function(event) {
            fetch(`/api/move?x=${x}&y=${y}`)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    console.log(json)
                    draw(json.board)
                });

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
}

document.addEventListener('DOMContentLoaded', function(event) {
    main();
})