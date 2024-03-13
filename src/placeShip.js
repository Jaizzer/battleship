import Gameboard from './Gameboard';
import Ship from './Ship';
import createGameboardForDOM from './createGameboardForDOM';

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

    // Create fleet container.
    let fleetContainer = document.createElement('div');
    fleetContainer.classList.add('fleet-container');
    document.querySelector('body').appendChild(fleetContainer);

    const playerGameboard = new Gameboard(10);

    const gameboardContainer = document.querySelector('body');
    const gameboardForDOM = createGameboardForDOM(playerGameboard, document.body);
    gameboardContainer.appendChild(gameboardForDOM);

    // Create the ships.
    playerFleet.forEach((ship) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship', `size-${ship.length}`, `${ship.orientation}`);
        shipDiv.draggable = true;

        shipDiv.addEventListener('dragstart', (event) => {
            // Add class indicating  that current ship is being dragged
            event.target.classList.add('dragging');

            // Set the cursor position to the bottom-left corner of the ship div
            const offsetX = 15;
            const offsetY = shipDiv.clientHeight - 20;

            // Set the drag image offset to the cursor position
            event.dataTransfer.setDragImage(shipDiv, offsetX, offsetY);

            // Get the current ship being dragged.
            let selected = shipDiv;

            // Store reference to the ships current grid container
            const currentGridContainer = shipDiv.parentElement;

            // Get previous grid's coordinates.
            const [previousX, previousY] = currentGridContainer.id.split('-');

            const isShipCurrentlyOnGameboard = currentGridContainer.classList.contains('gameboard-grid');

            // Access all the grids in the gameboard.
            let grids = [...gameboardForDOM.childNodes];
            grids.forEach((grid) => {
                grid.addEventListener('dragover', (event) => {
                    event.preventDefault();
                });
                grid.addEventListener('drop', () => {
                    // Don't drop ship if location is invalid
                    try {
                        // If the ship that was dropped came from a previous grid, remove the ship from that previous grid
                        if (currentGridContainer !== null && isShipCurrentlyOnGameboard) {
                            playerGameboard.removeShipAt([parseInt(previousX), parseInt(previousY)]);
                        }

                        // Place the ship to the new grid container
                        let [newX, newY] = grid.id.split('-');
                        playerGameboard.placeShip(ship, [parseInt(newX), parseInt(newY)]);

                        // Put the ship starting from currently selected grid
                        grid.appendChild(selected);
                    } catch (error) {
                        // Place the ship back to its previous grid if the ship dropping attempt failed on the new grid
                        if (currentGridContainer !== null && isShipCurrentlyOnGameboard) {
                            playerGameboard.placeShip(ship, [parseInt(previousX), parseInt(previousY)]);
                        }
                        alert(error);
                    }
                });
            });

            fleetContainer.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            fleetContainer.addEventListener('drop', () => {
                // If the ship that was dropped came from a previous grid, remove the ship from that previous grid
                if (currentGridContainer !== null && isShipCurrentlyOnGameboard) {
                    playerGameboard.removeShipAt([parseInt(previousX), parseInt(previousY)]);
                }
                fleetContainer.appendChild(selected);
            });
        });

        shipDiv.addEventListener('dragend', (event) => {
            // Remove class indicating that the current ship has stopped being dragged.
            event.target.classList.remove('dragging');

            // Access all the grids in the gameboard.
            let grids = [...gameboardForDOM.childNodes];

            // Clear event listeners to all grid after a ship is succesfully dropped to a particular grid to prevent muliple attachment of event grids
            grids.forEach((currentGrid) => {
                // Create a copy of a grid with no event listener
                const eventlessGrid = createCopyWithNoEventListener(currentGrid, true);
                currentGrid.parentNode.replaceChild(eventlessGrid, currentGrid);
            });

            // Clear all event listeners in the fleet container to prevent events from stacking together.
            const eventlessFleetContainer = createCopyWithNoEventListener(fleetContainer, true);
            fleetContainer.parentNode.replaceChild(eventlessFleetContainer, fleetContainer);
            fleetContainer = eventlessFleetContainer;
        });

        fleetContainer.appendChild(shipDiv);
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
