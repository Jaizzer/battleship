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
        let isGridOccupied = false;
        let isGridOutOfBounds = false;
        for (let i = 0; i < Ship.length; i++) {
            if (Ship.isVertical) {
                // Throw error if grid is out of bounds.
                isGridOutOfBounds = initialRow + i > 9 || initialColumn > 9;
                if (isGridOutOfBounds) {
                    throw new Error('Invalid coordinates: Out of bounds');
                }

                // Throw error if grid is already occupied
                isGridOccupied = this.grid[initialRow + i][initialColumn].ship !== null;
                if (isGridOccupied) {
                    throw new Error('Invalid coordinates: Grid already occupied');
                }

                this.grid[initialRow + i][initialColumn].ship = Ship;
            } else {
                // Throw error if grid is out of bounds.
                isGridOutOfBounds = initialRow > 9 || initialColumn + i > 9;
                if (isGridOutOfBounds) {
                    throw new Error('Invalid coordinates: Out of bounds');
                }

                // Throw error if grid is already occupied
                isGridOccupied = this.grid[initialRow][initialColumn + i].ship !== null;
                if (isGridOccupied) {
                    throw new Error('Invalid coordinates: Grid already occupied');
                }

                this.grid[initialRow][initialColumn + i].ship = Ship;
            }
        }
    }
}
