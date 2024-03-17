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
        const gridsToBeOccupied = [];
        for (let i = 0; i < Ship.length; i++) {
            let currentRow;
            let currentColumn;
            if (Ship.orientation === 'vertical') {
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

            // Check if ships are 1 grid apart.
            let areShipsOneGridApart = true;
            rowLoop: for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let row = currentRow + i;
                    let col = currentColumn + j;
                    // Only check grids that are not out of bounds.
                    if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid.length) {
                        // Immediately break once an adjacent grid containing a dfferent ship is found.
                        if (this.grid[row][col].ship !== null) {
                            areShipsOneGridApart = false;
                            break rowLoop;
                        }
                    }
                }
            }

            // Throw error if there is an adjacent grid that is occupied by a different ship (Ships are not 1-grid apart).
            if (!areShipsOneGridApart) {
                throw new Error('Invalid coordinates: Ships are not 1-grid apart');
            }

            // Add current grid to the array of grids to be occupied.
            gridsToBeOccupied.push(this.grid[currentRow][currentColumn]);
        }

        // Place the the ship to all the grids to be occupied.
        gridsToBeOccupied.forEach((grid) => {
            grid.ship = Ship;
        });

        // Append ship to the fleet array.
        this.fleet.push(Ship);
    }

    removeShipAt([x, y]) {
        // Check if starting location contains a ship.
        const selectedShip = this.grid[x][y].ship;
        if (selectedShip !== null) {
            this.grid.forEach((gridRow) => {
                gridRow.forEach((gridColumn) => {
                    if (gridColumn.ship === selectedShip) {
                        gridColumn.ship = null;
                    }
                });
            });
        }
        // Remove the ship in the fleet array
        this.fleet.splice(this.fleet.indexOf(selectedShip), 1);
    }

    isFleetSunk() {
        return this.fleet.every((ship) => ship.isSunk());
    }

    clear() {
        // Remove all ships on the grid.
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid.length; col++) {
                if (this.grid[row][col].ship !== null) {
                    this.grid[row][col].ship = null;
                }
            }
        }

        // Clear the fleet array.
        this.fleet = [];
    }
}
