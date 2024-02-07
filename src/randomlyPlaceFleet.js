export default function randomlyPlaceFleet(fleet, gameboard) {
    // Array to keep track of coordinates to be tried for ship placement.
    const unusedCoordinatesToTry = [];
    for (let x = 0; x < gameboard.grid.length; x++) {
        for (let y = 0; y < gameboard.grid.length; y++) {
            unusedCoordinatesToTry.push([x, y]);
        }
    }

    // Loop throuch each ship in the fleet.
    let currentShipIndex = 0;
    while (currentShipIndex < fleet.length) {
        // Get current ship.
        let ship = fleet[currentShipIndex];

        // Keep finding a valid area and then place the current ship.
        while (true) {
            try {
                // Randomly pick the coordinate where ship placement will start and get its x and y component.
                let indexOfStartingCoordinate = Math.floor(Math.random() * unusedCoordinatesToTry.length);
                let startingCoordinate = unusedCoordinatesToTry[indexOfStartingCoordinate];
                let [x, y] = startingCoordinate;

                // Remove current coordinates from the unused coordinates to try since it will now be used.
                unusedCoordinatesToTry.splice(indexOfStartingCoordinate, 1);

                // Place the ship on the gameboard.
                gameboard.placeShip(ship, [x, y]);

                // If ship was succesfully placed, remove those other coordinates that the ship has occupied  from the unused coordinates array since they are now being used.
                for (let i = 1; i < ship.length; i++) {
                    let indexOfSucceedingGridCoordinate;
                    if (ship.orientation === 'vertical') {
                        // Move to the next row if ship is vertical.
                        indexOfSucceedingGridCoordinate = indexOfStartingCoordinate + i * gameboard.grid.length;
                    } else {
                        // Move to the next column if ship is horizontal
                        indexOfSucceedingGridCoordinate = indexOfStartingCoordinate + i;
                    }
                    unusedCoordinatesToTry.splice(indexOfSucceedingGridCoordinate, 1);
                }

                // Move to the next ship in then next iteration.
                currentShipIndex++;
            } catch (shipPlacementError) {
                let noCoordinatesToTry = unusedCoordinatesToTry.length === 0;
                if (!noCoordinatesToTry) {
                    // Retry ship placement if there are still coordinates to try for ship placement.
                    continue;
                } else {
                    // Restart entire ship placement if there are no longer available coordinates to be tried.

                    // Restart from the first ship again.
                    currentShipIndex = 0;

                    // Reset the gameboard.
                    gameboard.clear();

                    // Repopulate the unused coordinates to try.
                    for (let x = 0; x < gameboard.grid.length; x++) {
                        for (let y = 0; y < gameboard.grid.length; y++) {
                            unusedCoordinatesToTry.push([x, y]);
                        }
                    }
                }
            }
            break;
        }
    }
    return gameboard;
}
