import Player from './Player';
import startGame from './startGame';
import Ship from './Ship';
import Gameboard from './Gameboard';
import randomlyPlaceFleet from './randomlyPlaceFleet';

test('startGame returns a Player object', () => {
    // Create Player A.
    const playerAName = 'Jaizzer';
    const playerAFleet = [
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(2, 'horizontal'),
        new Ship(2, 'horizontal'),
        new Ship(2, 'horizontal'),
        new Ship(3, 'vertical'),
        new Ship(3, 'horizontal'),
        new Ship(4, 'horizontal'),
    ];
    let playerAGameboard = randomlyPlaceFleet(playerAFleet, new Gameboard(10));
    const playerA = new Player(playerAName, playerAGameboard, true);

    // Create Player B.
    const playerBName = 'Computer';
    const playerBFleet = [
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(2, 'horizontal'),
        new Ship(2, 'horizontal'),
        new Ship(2, 'horizontal'),
        new Ship(3, 'vertical'),
        new Ship(3, 'horizontal'),
        new Ship(4, 'horizontal'),
    ];
    let playerBGameboard = randomlyPlaceFleet(playerBFleet, new Gameboard(10));
    const playerB = new Player(playerBName, playerBGameboard, true);

    // Make two computers fight.
    let winner = startGame(playerA, playerB);

    expect(winner instanceof Player).toBe(true);
});
