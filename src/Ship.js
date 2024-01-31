export default class Ship {
    constructor(length, orientation) {
        // Throw error if orientation is not valid
        if (!['vertical', 'horizontal'].includes(orientation)) {
            throw new Error('Invalid orientation. Only choose from "vertical" or "horizontal"');
        }
        this.length = length;
        this.hits = 0;
        this.orientation = orientation;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits === this.length;
    }
}
