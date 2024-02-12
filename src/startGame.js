export default function startGame(playerA, playerB) {
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
                // Prompt the coordinates if the player is not a computer.
                x = parseInt(prompt('X:'));
                y = parseInt(prompt('Y:'));
            }
            let gridIsNotHit = nextTurn.gameboard.grid[x][y].isHit === false;
            if (gridIsNotHit) {
                // Fire at the grid.
                nextTurn.gameboard.receiveAttack(x, y);

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
    }

    // If loop breaks, next turn player's fleet have sunk and current turn player is the winner.
    const winner = currentTurn;

    return winner;
}
