import Gameboard from './Gameboard';
import Ship from './Ship';
import renderGameboard from './renderGameboard';
import renderShipInventory from './renderShipInventory';

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

    renderShipInventory(playerFleet, document.querySelector('body'));

    const playerGameboard = new Gameboard(10);

    renderGameboard(playerGameboard, document.body);
}
