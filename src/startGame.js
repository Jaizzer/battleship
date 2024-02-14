import renderGameboard from './renderGameboard';

export default async function startGame(playerA, playerB) {
    let currentTurn = playerA;
    let nextTurn = playerB;

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
                document.body.innerHTML = '';
                renderGameboard(nextTurn.gameboard, document.body, false);
                renderGameboard(currentTurn.gameboard, document.body, true);

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

                // Update gameboard view if the player is not computer
                if (!currentTurn.isComputer) {
                    document.body.innerHTML = '';
                    renderGameboard(nextTurn.gameboard, document.body, false);
                    renderGameboard(currentTurn.gameboard, document.body, true);
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

        // Only show loading screen if both players are not computer
        if (!currentTurn.isComputer && !nextTurn.isComputer) {
            await passDevice();
        }
    }

    // If loop breaks, next turn player's fleet have sunk and current turn player is the winner.
    const winner = currentTurn;

    return winner;
}

// Function that waits for the player to select a grid and return the corresponding coordinates of that grid.
async function getGridCoordinatesToAttack(gameboard) {
    return new Promise((resolve) => {
        const grids = Array.from(gameboard.children);
        grids.forEach((grid) => {
            grid.addEventListener('click', () => {
                resolve([parseInt(grid.id[0]), parseInt(grid.id[2])]);
            });
        });
    });
}

function passDevice() {
    document.body.innerHTML = '';
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');

    const loadingScreenText = document.createElement('div');
    loadingScreenText.classList.add('text');
    loadingScreenText.innerHTML = 'Switching turns...';
    loadingScreen.appendChild(loadingScreenText);

    const loadingIcon = document.createElement('div');
    loadingIcon.classList.add('icon');
    loadingScreen.appendChild(loadingIcon);

    const button = document.createElement('button');
    button.classList.add('switch');
    button.innerHTML = 'Switch';
    loadingScreen.appendChild(button);

    document.body.appendChild(loadingScreen);

    return new Promise((resolve) => {
        button.addEventListener('click', () => {
            resolve();
        });
    });
}
