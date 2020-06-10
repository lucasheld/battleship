export default class ShipField {

    ship;
    number;
    pos;
    htmlElement;
    wasSet;
    isActive;

    /**
     * @param ship: Ship
     * @param number: number
     */
    constructor(ship, number) {
        this.ship = ship;
        this.number = number;
        this.wasSet = false;
        this.isActive = false;
    }

}
