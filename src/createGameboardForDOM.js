export default function createGameboardForDOM(gameboard, isVisible) {
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

            // Show the entire gameboard.
            if (isVisible && isGridOccupied) {
                grid.classList.add('occupied');
            } else if (isVisible && !isGridOccupied) {
                grid.classList.add('empty');
            }

            // Add class for grids that were hit.
            const isGridHit = gameboard.grid[row][column].isHit;
            if (isGridHit && isGridOccupied) {
                grid.classList.add('occupied', 'hit');
            } else if (isGridHit && !isGridOccupied) {
                grid.classList.add('empty', 'hit');
            }

            // Add the grid to the gameboard.
            gameboardDiv.appendChild(grid);
        }
    }

    // Configure the grid sizing of the gameboard.
    gameboardDiv.style.gridTemplateRows = `repeat(${gameboard.grid.length}, 50px)`;
    gameboardDiv.style.gridTemplateColumns = `repeat(${gameboard.grid.length}, 50px)`;

    return gameboardDiv;
}
