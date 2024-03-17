import Gameboard from './Gameboard';
import Ship from './Ship';
import createGameboardForDOM from './createGameboardForDOM';
import randomlyPlaceFleet from './randomlyPlaceFleet';

export default async function placeShip() {
    const playerFleet = [
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

    // Create fleet container
    let fleetContainer = document.createElement('div');
    fleetContainer.classList.add('fleet-container');
    document.querySelector('body').appendChild(fleetContainer);

    // Initialize the gameboard
    const playerGameboard = new Gameboard(10);

    // Render gameboard on the DOM
    const gameboardContainer = document.querySelector('body');
    const gameboardForDOM = createGameboardForDOM(playerGameboard, document.body);
    gameboardContainer.appendChild(gameboardForDOM);

    // Create the ships
    playerFleet.forEach((ship) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship', `size-${ship.length}`, `${ship.orientation}`);
        shipDiv.draggable = true;
        fleetContainer.appendChild(shipDiv);

        shipDiv.addEventListener('dragstart', (event) => {
            // Add class indicating  that current ship is being dragged
            event.target.classList.add('dragging');

            // Set the cursor position to the bottom-left corner of the ship div
            const offsetX = 15;
            const offsetY = shipDiv.clientHeight - 20;

            // Set the drag image offset to the cursor position
            event.dataTransfer.setDragImage(shipDiv, offsetX, offsetY);

            // Get the current ship being dragged
            let selected = shipDiv;

            // Store reference to the ships current grid container
            const currentGridContainer = shipDiv.parentElement;

            // Get ships current parent grid's coordinates
            const [currentX, currentY] = currentGridContainer.id.split('-');

            // Check if the ship is inside a grid
            const isShipCurrentlyOnGameboard = currentGridContainer.classList.contains('gameboard-grid');

            // Access all the grids in the gameboard
            let grids = [...gameboardForDOM.childNodes];

            // Add drag and drop events to the grids
            grids.forEach((grid) => {
                grid.addEventListener('dragover', (event) => {
                    event.preventDefault();
                });
                grid.addEventListener('drop', () => {
                    try {
                        // If the ship that was dropped came from another grid, remove the ship from that grid
                        if (currentGridContainer !== null && isShipCurrentlyOnGameboard) {
                            playerGameboard.removeShipAt([parseInt(currentX), parseInt(currentY)]);
                        }

                        // Place the ship to the new grid
                        let [newX, newY] = grid.id.split('-');
                        playerGameboard.placeShip(ship, [parseInt(newX), parseInt(newY)]);

                        // Render ship placement on the new grid
                        grid.appendChild(selected);
                    } catch (error) {
                        // Place the ship back to its current parent grid if the ship dropping attempt failed on the new target grid
                        if (currentGridContainer !== null && isShipCurrentlyOnGameboard) {
                            playerGameboard.placeShip(ship, [parseInt(currentX), parseInt(currentY)]);
                        }
                        alert(error);
                    }
                });
            });

            // Add drag and drop event to the fleet container so that ship can be put back outside the grid
            fleetContainer.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            fleetContainer.addEventListener('drop', () => {
                // If the ship that was dropped came from a previous grid, remove the ship from that previous grid
                if (currentGridContainer !== null && isShipCurrentlyOnGameboard) {
                    playerGameboard.removeShipAt([parseInt(currentX), parseInt(currentY)]);
                }
                // Render ship placement on the fleet container
                fleetContainer.appendChild(selected);
            });
        });

        shipDiv.addEventListener('dragend', (event) => {
            // Remove class indicating that the current ship has stopped being dragged.
            event.target.classList.remove('dragging');

            // Access all the grids in the gameboard.
            let grids = [...gameboardForDOM.childNodes];

            // Clear event listeners on all grid after a ship is  dropped to a particular grid to prevent muliple event listeners from stacking up on the grids
            grids.forEach((currentGrid) => {
                // Create a copy of a grid with no event listener (excluding the children nodes' event listeners)
                const eventlessGrid = createCopyWithNoEventListener(currentGrid, true);
                currentGrid.parentNode.replaceChild(eventlessGrid, currentGrid);
            });

            // Clear all event listeners in the fleet container to prevent events from stacking together (excluding the children nodes' event listeners)
            const eventlessFleetContainer = createCopyWithNoEventListener(fleetContainer, true);

            // Render new fleet container on DOM
            fleetContainer.parentNode.replaceChild(eventlessFleetContainer, fleetContainer);

            // Reassign the fleet container to the new fleet container.
            fleetContainer = eventlessFleetContainer;
        });
    });

    // Create reset button that returns ships back to fleet container
    const resetButton = document.createElement('button');
    resetButton.classList.add('reset');
    resetButton.textContent = 'Reset';
    document.body.appendChild(resetButton);

    resetButton.addEventListener('click', () => {
        // Remove all ships on the gameboard object
        playerGameboard.clear();

        // Move ships from the gameboard back to the fleet container
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                [...gameboardForDOM.childNodes].forEach((grid) => {
                    if (grid.firstChild) {
                        fleetContainer.appendChild(grid.firstChild);
                    }
                    grid.innerHTML = '';
                });
            }
        }
    });

    // Create random button that randomly places the ships on the gameboard
    const randomButton = document.createElement('button');
    randomButton.classList.add('random');
    randomButton.textContent = 'Random';
    document.body.append(randomButton);
    randomButton.addEventListener('click', () => {
        // Reset gameboard first.
        resetButton.click();

        // Create a reference gameboard with randomly place ships
        const randomGameboardReference = randomlyPlaceFleet(playerFleet, new Gameboard(10));

        // Copy ship placements of randomGameboardReference to the playerGameboard
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (randomGameboardReference.grid[i][j].ship) {
                    const currentShip = randomGameboardReference.grid[i][j].ship;
                    try {
                        playerGameboard.placeShip(currentShip, [i, j]);

                        // Find the same ship in the fleet container that matches the current target ship (same size, same orientation) on randomGameboardReference
                        const shipNode = [...fleetContainer.childNodes].find((ship) => {
                            return ship.classList.contains(`size-${currentShip.length}`) && ship.classList.contains(`${currentShip.orientation}`);
                        });

                        // Move the ship from the fleet container to the gameboard
                        fleetContainer.removeChild(shipNode);
                        const currentGrid = document.getElementById(`${i}-${j}`);
                        currentGrid.appendChild(shipNode);
                    } catch (error) {
                        continue;
                    }
                }
            }
        }
    });

    return new Promise((resolve) => {
        // Create done button that returns the gameboard containing the ship placement
        const doneButton = document.createElement('button');
        doneButton.classList.add('done');
        doneButton.textContent = 'Done';
        document.querySelector('body').appendChild(doneButton);

        doneButton.addEventListener('click', () => {
            const thereAreShipsLeft = [...fleetContainer.childNodes].length === 0;

            // Return the gameboard only if all ships are placed.
            if (thereAreShipsLeft) {
                // Clear the DOM
                document.body.innerHTML = '';
                resolve(playerGameboard);
            } else {
                alert('You must place all the ships on the gameboard!');
            }
        });
    });
}

// Create a copy of node with with no event listener including or excluding the children nodes' event listeners.
function createCopyWithNoEventListener(element, boolean) {
    // Create a copy of the original element with no event listener
    const noEventListenerElement = element.cloneNode(false);

    // Retain the original children
    if (boolean) {
        [...element.childNodes].forEach((child) => {
            noEventListenerElement.appendChild(child);
        });
    }

    return noEventListenerElement;
}
