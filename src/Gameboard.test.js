import Gameboard from './Gameboard';

test('Unhit grids will have a false "isHit" value', () => {
    let gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    // Obtain all grid except the grids that were hit.
    const flattenedArray = gameboard.grid.flat().slice(3);

    expect(
        flattenedArray.every((element) => {
            return element.isHit === false;
        })
    ).toBe(true);
});

test('Hit grids will have a true "isHit" value', () => {
    let gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.grid[0][0].isHit && gameboard.grid[0][1].isHit && gameboard.grid[0][2].isHit).toBe(true);
});
