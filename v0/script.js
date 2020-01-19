function main() {
    let tiles = document.querySelectorAll(".tile");

    let turn = true;

    for (let tile of tiles) {
        tile.addEventListener("click", function(event) {
            if (turn) {
                this.innerHTML = "X";
            } else {
                this.innerHTML = "O";
            }
            turn = !turn;
        });

        tile.addEventListener("mouseover", function(event) {
            this.style.color = "red";
        });

        tile.addEventListener("mouseleave", function(event) {
            this.style.color = "black";
        });
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    main();
})