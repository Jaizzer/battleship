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
    const fleetContainer = document.createElement('div');
    fleetContainer.classList.add('fleet-container');

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

        shipDiv.addEventListener('dragend', () => {
            // Access all the grids in the gameboard.
            let grids = [...gameboardForDOM.childNodes];

            // Clear event listeners to all grid after a ship is succesfully dropped to a particular grid to prevent muliple attachment of event grids
            grids.forEach((currentGrid) => {
                // Create a copy of a grid with no event listener
                const noEventListenerGrid = currentGrid.cloneNode(true);
                // Don't replace the ship inside the grid to preserve the ship's dragstart event
                if (currentGrid.firstChild) {
                    const originalShip = currentGrid.firstChild;
                    noEventListenerGrid.replaceChild(originalShip, noEventListenerGrid.firstChild);
                }
                // Put the grid with no event listener to the gameboard
                currentGrid.parentNode.replaceChild(noEventListenerGrid, currentGrid);
            });
        });

        fleetContainer.appendChild(shipDiv);
    });
    document.querySelector('body').appendChild(fleetContainer);
}
