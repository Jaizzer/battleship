export default class Ship {
    constructor(length, isVertical) {
        this.length = length;
        this.hits = 0;
        this.isVertical = isVertical ?? true;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits === this.length;
    }
}
