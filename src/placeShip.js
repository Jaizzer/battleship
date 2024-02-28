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
            // Set the cursor position to the bottom-left corner of the ship div.
            const offsetX = 15;
            const offsetY = shipDiv.clientHeight - 20;

            // Set the drag image offset to the cursor position.
            event.dataTransfer.setDragImage(shipDiv, offsetX, offsetY);

            // Get the current ship being dragged.
            let selected = shipDiv;

            // Access all the grids in the gameboard.
            let grids = [...gameboardForDOM.childNodes];
            grids.forEach((grid) => {
                grid.addEventListener('dragover', (event) => {
                    event.preventDefault();
                });
                grid.addEventListener('drop', () => {
                    // Don't drop ship is location is invalid.
                    try {
                        let [x, y] = grid.id.split('-');
                        playerGameboard.placeShip(ship, [parseInt(x), parseInt(y)]);

                        // Put the ship starting from currently selected grid.
                        grid.appendChild(selected);
                    } catch (error) {
                        alert(error);
                    }

                    // Clear event listeners to all grid after a ship is succesfully dropped to a particular grid to prevent muliple attachment of event grids.
                    grids.forEach((currentGrid) => {
                        // Create a copy of a grid with no event listener.
                        const noEventListenerGrid = currentGrid.cloneNode(true);
                        console.log(noEventListenerGrid);

                        // Don't replace the ship inside the grid to preserve the ship's dragstart event.
                        if (currentGrid.firstChild) {
                            const originalShip = currentGrid.firstChild;
                            noEventListenerGrid.replaceChild(originalShip, noEventListenerGrid.firstChild);
                        }
                        // Put the grid with no event listener to the gameboard.
                        currentGrid.parentNode.replaceChild(noEventListenerGrid, currentGrid);
                    });
                });
            });
        });
        fleetContainer.appendChild(shipDiv);
    });
    document.querySelector('body').appendChild(fleetContainer);
}
