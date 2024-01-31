import Ship from './Ship';

test('Hit count of newly created ship is zero', () => {
    const shipLength = 5;
    const ship0 = new Ship(shipLength, 'vertical');
    expect(ship0.hits).toBe(0);
});

test('Ship length is the same as the length during instantiation', () => {
    const shipLength = 5;
    const ship0 = new Ship(shipLength, 'vertical');
    expect(ship0.length).toBe(shipLength);
});

test('Hitting the ship increases its hit by 1', () => {
    const shipLength = 5;
    const ship0 = new Ship(shipLength, 'vertical');
    let previousHitCount = ship0.hits;
    ship0.hit();
    expect(ship0.hits - previousHitCount).toBe(1);
});

test('Hitting the ship the same amount its length makes it sink', () => {
    const shipLength = 5;
    const ship0 = new Ship(shipLength, 'vertical');
    for (let i = 0; i < ship0.length; i++) {
        ship0.hit();
    }
    expect(ship0.isSunk()).toBe(true);
});

test('Hitting the ship by the amount less than its length does not make it sink', () => {
    const shipLength = 5;
    const ship0 = new Ship(shipLength, 'vertical');
    for (let i = 0; i < ship0.length - 2; i++) {
        ship0.hit();
    }
    expect(ship0.isSunk()).toBe(false);
});

test('Ships are vertical if not specified during instantiation', () => {
    const shipLength = 5;
    const ship0 = new Ship(shipLength, 'vertical');
    expect(ship0.orientation).toBe('vertical');
});
