export default class Field {

    pos;
    isHit;
    hasShip;
    isNextToShip;
    htmlElement;

    /**
     * @param pos: Vector2
     */
    constructor(pos) {
        this.pos = pos;
        this.isHit = false;
        this.hasShip = false;
        this.isNextToShip = false;
    }

}
