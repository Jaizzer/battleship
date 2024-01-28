import Gameboard from './Gameboard';
import Ship from './Ship';

test('Unhit grids will have a false "isHit" value', () => {
    const gameboard = new Gameboard();
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
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.grid[0][0].isHit && gameboard.grid[0][1].isHit && gameboard.grid[0][2].isHit).toBe(true);
});

test('Ships are placed at the right coordinates', () => {
    // Create gameboard.
    const gameboard = new Gameboard();

    // Create a size 4 vertical ship.
    const shipLength = 4;
    const isVertical = true;
    const ship = new Ship(shipLength, isVertical);

    // Place the ship.
    const initialRow = 0;
    const initialColumn = 1;
    gameboard.placeShip(ship, [initialRow, initialColumn]);

    // Get all the grids occupied by the ship
    const occupiedGrids = [];
    for (let i = 0; i < shipLength; i++) {
        if (ship.isVertical) {
            occupiedGrids.push(gameboard.grid[initialRow + i][initialColumn]);
        } else {
            occupiedGrids.push(gameboard.grid[initialRow][initialColumn + 1]);
        }
    }

    expect(occupiedGrids.every((grid) => grid.ship === ship)).toBe(true);
});

test('Place ship method throws an error if a vertical ship is placed in an invalid coordinates ', () => {
    // Create gameboard.
    const gameboard = new Gameboard();

    // Create a size 4 vertical ship.
    const shipLength = 4;
    const isVertical = true;
    const ship = new Ship(shipLength, isVertical);

    // Place the ship.
    const initialRow = 9;
    const initialColumn = 9;

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        gameboard.placeShip(ship, [initialRow, initialColumn]);
    };

    // Use the expect statement with the wrapped function
    expect(placeShipOperation).toThrow(/Invalid/);
});

test('Place ship method throws an error if a horizontal ship is placed in an invalid coordinates ', () => {
    // Create gameboard.
    const gameboard = new Gameboard();

    // Create a size 2 horizontal ship.
    const shipLength = 2;
    const isVertical = false;
    const ship = new Ship(shipLength, isVertical);

    // Place the ship.
    const initialRow = 0;
    const initialColumn = 9;

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        gameboard.placeShip(ship, [initialRow, initialColumn]);
    };

    // Use the expect statement with the wrapped function
    expect(placeShipOperation).toThrow(/Invalid coordinates: Out of bounds/);
});

test('placeShip() throws an error if a grid is already occoupied by another ship', () => {
    // Create gameboard.
    const gameboard = new Gameboard();

    // Create ship A.
    const shipLength = 3;
    const isVertical = true;
    const shipA = new Ship(shipLength, isVertical);

    // Place the ship A.
    const initialRow = 0;
    const initialColumn = 0;
    gameboard.placeShip(shipA, [initialRow, initialColumn]);

    // Create ship B.
    const shipB = new Ship(3, true);

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        // Place the ship on an already occupied grid.
        gameboard.placeShip(shipB, [initialRow, initialColumn]);
    };
    expect(placeShipOperation).toThrow(/Invalid coordinates: Grid already occupied/);
});

test('placeShip() throws an error if ships are not 1 grid apart', () => {
    // Create gameboard.
    const gameboard = new Gameboard();

    // Create ship A.
    const shipLength = 3;
    const isVertical = true;
    const shipA = new Ship(shipLength, isVertical);

    // Place the ship A.
    const initialRow = 0;
    const initialColumn = 0;
    gameboard.placeShip(shipA, [initialRow, initialColumn]);

    // Create ship B.
    const shipB = new Ship(3, true);

    // Wrap the placeShip operation in a function
    const placeShipOperation = () => {
        // Place the ship B next to ship A.
        gameboard.placeShip(shipB, [initialRow, initialColumn + 1]);
    };
    expect(placeShipOperation).toThrow(/Invalid coordinates: Ships are not 1-grid apart/);
});
