import startGame from './startGame';
import getGameMode from './getGameMode';
import createPlayer from './createPlayer';
import popUpMessage from './popUpMessage';

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
            player1 = await createPlayer(false, 'Player 1');
            player2 = await createPlayer(true, 'Player 2');
            break;

        case 'multiplayer-1-device':
            // Create two player that are both 'human.
            player1 = await createPlayer(false, 'Player 1');
            player2 = await createPlayer(false, 'Player 2');
            break;

        case 'multiplayer-2-device':
            popUpMessage('Sorry', `This feature is currently not available`);
            const closeButton = document.querySelector('.close');
            await new Promise((resolve) => {
                closeButton.addEventListener('click', () => {
                    location.reload();
                    resolve();
                });
            });
    }

    popUpMessage('Start Game', `Press "Continue" to Start Game`);
    const continueButton = document.querySelector('.close');
    continueButton.addEventListener('click', async () => {
        let winner = await startGame(player1, player2);

        popUpMessage('Game Ended', `${winner.name} won!`);
        const closeButton = document.querySelector('.close');
        await new Promise((resolve) => {
            closeButton.addEventListener('click', () => {
                location.reload();
                resolve();
            });
        });
    });
}
