export default class Gameboard {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                row.push({ isHit: false, ship: null });
            }
            this.grid.push(row);
        }
    }

    receiveAttack(x, y) {
        this.grid[x][y].isHit = true;
    }

    placeShip(Ship, [initialRow, initialColumn]) {
        for (let i = 0; i < Ship.length; i++) {
            let currentRow;
            let currentColumn;
            if (Ship.isVertical) {
                currentRow = initialRow + i;
                currentColumn = initialColumn;
            } else {
                currentRow = initialRow;
                currentColumn = initialColumn + i;
            }

            // Throw error if grid is out of bounds.
            let isGridOutOfBounds = currentRow > 9 || currentColumn > 9;
            if (isGridOutOfBounds) {
                throw new Error('Invalid coordinates: Out of bounds');
            }

            // Throw error if grid is already occupied
            let isGridOccupied = this.grid[currentRow][currentColumn].ship !== null;
            if (isGridOccupied) {
                throw new Error('Invalid coordinates: Grid already occupied');
            }

            // Get all possible adjacent coordinates of current grid.
            let adjacentGridsCoordinates = [
                [currentRow - 1, currentColumn - 1],
                [currentRow - 1, currentColumn],
                [currentRow - 1, currentColumn + 1],
                [currentRow, currentColumn - 1],
                [currentRow, currentColumn + 1],
                [currentRow + 1, currentColumn - 1],
                [currentRow + 1, currentColumn],
                [currentRow + 1, currentColumn + 1],
            ];

            // Get all the valid coordinates (not out of bounds).
            adjacentGridsCoordinates = adjacentGridsCoordinates.filter(([gridCoordinateRow, gridCoordinateColumn]) => {
                if (gridCoordinateRow >= 0 && gridCoordinateRow <= 9 && gridCoordinateColumn >= 0 && gridCoordinateColumn <= 9) {
                    return true;
                }
                return false;
            });

            // Get all the valid grid from the valid coordinates.
            let adjacentGrids = adjacentGridsCoordinates.map(([adjacentGridsCoordinateRow, adjacentGridsCoordinateColumn]) => {
                return this.grid[adjacentGridsCoordinateRow][adjacentGridsCoordinateColumn];
            });

            // Check if all valid adjacent grids are empty or occupied by the same ship to be placed at the current grid.
            let isShipOneGridApart = adjacentGrids.every((grid) => {
                return grid.ship === null || grid.ship === Ship;
            });

            // Throw error if there is an adjacent grid that is occupied by a different ship (Ships are not 1-grid apart).
            if (!isShipOneGridApart) {
                throw new Error('Invalid coordinates: Ships are not 1-grid apart');
            }

            // Place the ship at current grid.
            this.grid[currentRow][currentColumn].ship = Ship;
        }
    }
}
