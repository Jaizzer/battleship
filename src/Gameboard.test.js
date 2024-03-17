import Gameboard from './Gameboard';
import Ship from './Ship';

test('Unhit grids will have a false "isHit" value', () => {
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    // Obtain all grid except the grids that were hit.
    const flattenedArray = gameboard.grid.flat().slice(3);

    expect(
        flattenedArray.every((element) => {
            return element.isHit === false;
        })
    ).toBe(true);
});

test('Hit grids will have a true "isHit" value', () => {
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.grid[0][0].isHit && gameboard.grid[0][1].isHit && gameboard.grid[0][2].isHit).toBe(true);
});

test('Ships are placed at the right coordinates', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create a size 4 vertical ship.
    const shipLength = 4;
    const orientation = 'vertical';
    const ship = new Ship(shipLength, orientation);

    // Place the ship.
    const initialRow = 0;
    const initialColumn = 1;
    gameboard.placeShip(ship, [initialRow, initialColumn]);

    // Get all the grids occupied by the ship
    const occupiedGrids = [];
    for (let i = 0; i < shipLength; i++) {
        if (ship.orientation) {
            occupiedGrids.push(gameboard.grid[initialRow + i][initialColumn]);
        } else {
            occupiedGrids.push(gameboard.grid[initialRow][initialColumn + 1]);
        }
    }

    expect(occupiedGrids.every((grid) => grid.ship === ship)).toBe(true);
});

test('Newly placed ships are appended to the fleet array', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create a size 4 vertical ship.
    const shipLength = 4;
    const orientation = 'vertical';
    const ship = new Ship(shipLength, orientation);
    gameboard.placeShip(ship, [5, 5]);

    expect(gameboard.fleet[gameboard.fleet.length - 1]).toBe(ship);
});

test('Place ship method throws an error if a vertical ship is placed in an invalid coordinates ', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create a size 4 vertical ship.
    const shipLength = 4;
    const orientation = 'vertical';
    const ship = new Ship(shipLength, orientation);

    // Place the ship.
    const initialRow = boardSize;
    const initialColumn = boardSize;

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        gameboard.placeShip(ship, [initialRow, initialColumn]);
    };

    // Use the expect statement with the wrapped function
    expect(placeShipOperation).toThrow(/Invalid coordinates: Out of bounds/);
});

test('Place ship method throws an error if a horizontal ship is placed in an invalid coordinates ', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create a size 2 horizontal ship.
    const shipLength = 2;
    const orientation = 'horizontal';
    const ship = new Ship(shipLength, orientation);

    // Place the ship.
    const initialRow = 0;
    const initialColumn = boardSize;

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        gameboard.placeShip(ship, [initialRow, initialColumn]);
    };

    // Use the expect statement with the wrapped function
    expect(placeShipOperation).toThrow(/Invalid coordinates: Out of bounds/);
});

test('placeShip() throws an error if a grid is already occoupied by another ship', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create ship A.
    const shipLength = 3;
    const orientation = 'vertical';
    const shipA = new Ship(shipLength, orientation);

    // Place the ship A.
    const initialRow = 0;
    const initialColumn = 0;
    gameboard.placeShip(shipA, [initialRow, initialColumn]);

    // Create ship B.
    const shipB = new Ship(3, 'vertical');

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        // Place the ship on an already occupied grid.
        gameboard.placeShip(shipB, [initialRow, initialColumn]);
    };
    expect(placeShipOperation).toThrow(/Invalid coordinates: Ships are not 1-grid apart/);
});

test('placeShip() throws an error if ships are not 1 grid apart', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create ship A.
    const shipLength = 3;
    const orientation = 'vertical';
    const shipA = new Ship(shipLength, orientation);

    // Place the ship A.
    const initialRow = 0;
    const initialColumn = 0;
    gameboard.placeShip(shipA, [initialRow, initialColumn]);

    // Create ship B.
    const shipB = new Ship(3, 'vertical');

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        // Place the ship B next to ship A.
        gameboard.placeShip(shipB, [initialRow, initialColumn + 1]);
    };
    expect(placeShipOperation).toThrow(/Invalid coordinates: Ships are not 1-grid apart/);
});

test('isFleetSunk() returns true if all ships were sunk', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create ship A.
    const shipA = new Ship(3, 'vertical');

    // Place the ship A.
    gameboard.placeShip(shipA, [0, 0]);

    // Create ship B.
    const shipB = new Ship(2, 'vertical');

    // Place the ship B.
    gameboard.placeShip(shipB, [0, 4]);

    // Hit all the grids containing ship.
    for (let i = 0; i < gameboard.grid.length; i++) {
        for (let j = 0; j < gameboard.grid.length; j++) {
            let gridIsOccupiedByAShip = gameboard.grid[i][j].ship !== null;
            if (gridIsOccupiedByAShip) {
                gameboard.receiveAttack(i, j);
            }
        }
    }
    expect(gameboard.isFleetSunk()).toBe(true);
});

test('isFleetSunk() returns false if not all ships were sunk', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create ship A.
    const shipA = new Ship(3, 'vertical');

    // Place the ship A.
    gameboard.placeShip(shipA, [0, 0]);

    // Create ship B.
    const shipB = new Ship(2, 'vertical');

    // Place the ship B.
    gameboard.placeShip(shipB, [0, 4]);

    // Only hit ship A.
    for (let i = 0; i < gameboard.grid.length; i++) {
        for (let j = 0; j < gameboard.grid.length; j++) {
            let gridIsOccupiedByAShipA = gameboard.grid[i][j].ship === shipA;
            if (gridIsOccupiedByAShipA) {
                gameboard.receiveAttack(i, j);
            }
        }
    }
    expect(gameboard.isFleetSunk()).toBe(false);
});

test('removeShip() removes a ship in the gameboard', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create ship A.
    const shipA = new Ship(3, 'vertical');
    const shipB = new Ship(3, 'vertical');

    // Place the ship A and B.
    gameboard.placeShip(shipA, [0, 0]);
    gameboard.placeShip(shipB, [0, 2]);

    // Remove ship A and B.
    gameboard.removeShipAt([0, 0]);
    gameboard.removeShipAt([0, 2]);

    expect(
        [
            gameboard.grid[0][0].ship,
            gameboard.grid[1][0].ship,
            gameboard.grid[1][0].ship,
            gameboard.grid[0][2].ship,
            gameboard.grid[1][2].ship,
            gameboard.grid[2][2].ship,
        ].every((grid) => grid === null)
    ).toBe(true);
});

test('removeShip() removes a ship in the fleet array', () => {
    // Create gameboard.
    const boardSize = 10;
    const gameboard = new Gameboard(boardSize);

    // Create ship A.
    const shipA = new Ship(3, 'vertical');
    const shipB = new Ship(3, 'vertical');

    // Place the ship A and B.
    gameboard.placeShip(shipA, [0, 0]);
    gameboard.placeShip(shipB, [0, 2]);

    // Remove ship A and B.
    gameboard.removeShipAt([0, 0]);
    gameboard.removeShipAt([0, 2]);

    expect(gameboard.fleet.includes(shipA) && gameboard.fleet.includes(shipB)).toBe(false);
});
