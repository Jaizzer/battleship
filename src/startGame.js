import createGameboardForDOM from './createGameboardForDOM';
import getGridCoordinatesToAttack from './getCoordinatesToAttack';
import passDevice from './passDevice';

export default async function startGame(playerA, playerB) {
    let currentTurn = playerA;
    let nextTurn = playerB;

    // Access container to render gameboards.
    const gameboardContainer = document.createElement('div');
    gameboardContainer.classList.add('gameboard-container');
    document.body.appendChild(gameboardContainer);

    outer: while (true) {
        // Keep choosing a grid until a grid that is currently not hit is found.
        while (true) {
            let x;
            let y;

            if (currentTurn.isComputer) {
                // Choose coordiantes randomly if the player is computer.
                x = Math.floor(Math.random() * currentTurn.gameboard.grid.length);
                y = Math.floor(Math.random() * currentTurn.gameboard.grid.length);
            } else {
                // Update gameboard view
                gameboardContainer.innerHTML = '';
                gameboardContainer.appendChild(createGameboardForDOM(nextTurn.gameboard, false));
                gameboardContainer.appendChild(createGameboardForDOM(currentTurn.gameboard, true));

                // Access the gameboard.
                const gameboard = document.querySelector('.gameboard');
                if (!gameboard) throw new Error('"gameboard" not found');

                // Wait for user to select a grid from the gameboard and get the corresponding coordinates.
                [x, y] = await getGridCoordinatesToAttack(gameboard);
            }

            let gridIsNotHit = nextTurn.gameboard.grid[x][y].isHit === false;
            if (gridIsNotHit) {
                // Fire at the grid.
                nextTurn.gameboard.receiveAttack(x, y);

                // Update gameboard view after every attack.
                if (!currentTurn.isComputer) {
                    gameboardContainer.innerHTML = '';
                    gameboardContainer.appendChild(createGameboardForDOM(nextTurn.gameboard, false));
                    gameboardContainer.appendChild(createGameboardForDOM(currentTurn.gameboard, true));
                } else {
                    // Highlight the most recent attack by computer
                    const ownGameboard = [...document.querySelectorAll('.gameboard')][1];
                    const recentlyAttackedGrid = [...ownGameboard.childNodes][(9 - x) * 10 + y];
                    recentlyAttackedGrid.id = 'recently-attacked';

                    // Add 1 second delay to show sequential attack moves of the computer if it hit a ship.
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    gameboardContainer.innerHTML = '';
                    gameboardContainer.appendChild(createGameboardForDOM(currentTurn.gameboard, false));
                    gameboardContainer.appendChild(createGameboardForDOM(nextTurn.gameboard, true));
                }

                // Ship is hit.
                if (nextTurn.gameboard.grid[x][y].ship) {
                    // Terminate game if the ship hit was the last ship in the fleet.
                    if (nextTurn.gameboard.isFleetSunk()) {
                        break outer;
                    }
                    // The ship hit was not the last ship in the fleet, hence make the current player choose another target grid.
                    continue;
                }

                // Terminate player turn if no ship was hit.
                break;
            }
        }

        // Swap turns.
        let temp;
        temp = currentTurn;
        currentTurn = nextTurn;
        nextTurn = temp;

        // Add 1 second delay to give DOM enough time to update gameboards before switching players.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Only show loading screen if both players are not computer
        if (!currentTurn.isComputer && !nextTurn.isComputer) {
            await passDevice(currentTurn.name);
        }
    }

    // If loop breaks, next turn player's fleet have sunk and current turn player is the winner.
    const winner = currentTurn;

    return winner;
}
