export default class Gameboard {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                row.push({ isHit: false });
            }
            this.grid.push(row);
        }
    }
}
