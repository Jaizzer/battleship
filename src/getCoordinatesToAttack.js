// Function that waits for the player to select a grid and return the corresponding coordinates of that grid.
export default async function getGridCoordinatesToAttack(gameboard) {
    return new Promise((resolve) => {
        const grids = Array.from(gameboard.children);
        grids.forEach((grid) => {
            grid.addEventListener('click', () => {
                resolve([parseInt(grid.id[0]), parseInt(grid.id[2])]);
            });
        });
    });
}
