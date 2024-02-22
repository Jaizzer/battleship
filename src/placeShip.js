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
    gameboardContainer.appendChild(createGameboardForDOM(playerGameboard, document.body));

    // Create the ships.
    playerFleet.forEach((ship) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship', `size-${ship.length}`, `${ship.orientation}`);
        shipDiv.draggable = true;

        fleetContainer.appendChild(shipDiv);
    });
    document.querySelector('body').appendChild(fleetContainer);
}
