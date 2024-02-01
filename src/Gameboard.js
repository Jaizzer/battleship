export default class Gameboard {
    constructor(size) {
        this.grid = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push({ isHit: false, ship: null });
            }
            this.grid.push(row);
        }

        // Initialize fleet.
        this.fleet = [];
    }

    receiveAttack(x, y) {
        this.grid[x][y].isHit = true;

        // Hit the ship that occupies the grid.
        let isGridOccupied = this.grid[x][y].ship !== null;
        if (isGridOccupied) {
            this.grid[x][y].ship.hit();
        }
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
            let isGridOutOfBounds = currentRow >= this.grid.length || currentColumn >= this.grid.length;
            if (isGridOutOfBounds) {
                throw new Error('Invalid coordinates: Out of bounds');
            }

            // Get all possible adjacent coordinates of current grid.
            let adjacentGridsCoordinates = [
                [initialRow, initialColumn],
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
                if (
                    gridCoordinateRow >= 0 &&
                    gridCoordinateRow < this.grid.length &&
                    gridCoordinateColumn >= 0 &&
                    gridCoordinateColumn < this.grid.length
                ) {
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
        // Append ship to the fleet array.
        this.fleet.push(Ship);
    }

    isFleetSunk() {
        return this.fleet.every((ship) => ship.isSunk());
    }
}
