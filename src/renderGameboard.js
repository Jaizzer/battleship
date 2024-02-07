export default function renderGameboard(gameboard, parentElement) {
    // Create gameboard.
    const gameboardDiv = document.createElement('div');
    gameboardDiv.classList.add('gameboard');

    // Add the grids.
    for (let row = gameboard.grid.length - 1; row >= 0; row--) {
        for (let column = 0; column < gameboard.grid.length; column++) {
            // Create div for grid.
            const grid = document.createElement('div');
            grid.classList.add('gameboard-grid');
            grid.id = `${row}-${column}`;

            // Add classes describing whether a grid is occupied or empty.
            const isGridOccupied = gameboard.grid[row][column].ship !== null;
            if (isGridOccupied) {
                grid.classList.add('occupied');
            } else {
                grid.classList.add('empty');
            }

            // Add the grid to the gameboard.
            gameboardDiv.appendChild(grid);
        }
    }

    // Configure the grid sizing of the gameboard.
    gameboardDiv.style.gridTemplateRows = `repeat(${gameboard.grid.length}, 50px)`;
    gameboardDiv.style.gridTemplateColumns = `repeat(${gameboard.grid.length}, 50px)`;

    // Put the gameboard to parent element.
    parentElement.appendChild(gameboardDiv);
}
