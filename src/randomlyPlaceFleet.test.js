import Gameboard from './Gameboard';
import randomlyPlaceFleet from './randomlyPlaceFleet';
import Ship from './Ship';

test('Function returns a gameboard with its grid populated with the ships from the fleet passed in as argument', () => {
    const gameboard = new Gameboard(10);
    const fleet = [
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

    let populatedGameboard = randomlyPlaceFleet(fleet, gameboard);

    expect(populatedGameboard.fleet).toEqual(fleet);
});
