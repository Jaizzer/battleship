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
        try {
            for (let i = 0; i < Ship.length; i++) {
                if (Ship.isVertical) {
                    this.grid[initialRow + i][initialColumn].ship = Ship;
                } else {
                    this.grid[initialRow][initialColumn + i].ship = Ship;
                }
            }
        } catch (error) {
            throw new Error('Invalid coordinates');
        }
    }
}
