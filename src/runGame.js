import Gameboard from './Gameboard';
import Ship from './Ship';
import Player from './Player';
import randomlyPlaceFleet from './randomlyPlaceFleet';

export default function runGame() {
    const gameModes = ['single-player-1-device', 'multiplayer-1-device', 'multiplayer-2-device'];

    // Pick a game mode (set to single player for now).
    const currentGameMode = gameModes[0];

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
    const playerA = new Player(playerAName, playerAGameboard, false);

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
    const playerB = new Player(playerBName, playerBGameboard, false);
}
