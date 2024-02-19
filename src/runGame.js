import Gameboard from './Gameboard';
import Ship from './Ship';
import Player from './Player';
import randomlyPlaceFleet from './randomlyPlaceFleet';
import startGame from './startGame';
import getGameMode from './getGameMode';
import createPlayer from './createPlayer';

export default async function runGame() {
    const gameModes = ['single-player-1-device', 'multiplayer-1-device', 'multiplayer-2-device'];

    // Pick a game mode (set to single player for now).
    const currentGameMode = await getGameMode(gameModes);

    // Create the players.
    let player1;
    let player2;
    switch (currentGameMode) {
        case 'single-player-1-device':
            // Create 1 human player and 1 computer.
            player1 = await createPlayer(false);
            player2 = await createPlayer(true);
            break;

        case 'multiplayer-1-device':
            // Create two player that are both 'human.
            player1 = await createPlayer(false);
            player2 = await createPlayer(false);
            break;
    }

    let winner = await startGame(player1, player2);

    alert(`${winner.name} won!`);
}
