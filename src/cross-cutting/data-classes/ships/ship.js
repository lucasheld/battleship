import ShipField from "./ship-field";

export default class Ship {

    id;
    name;
    size;
    shipFields;
    isVertical;
    htmlElement;

    /**
     * @param id: number
     * @param name: string
     * @param size: number
     */
    constructor(id, name, size) {
        this.id = id;
        this.name = name;
        this.size = size;
        for(let i = 0; i < size; i++) {
            this.shipFields.push(new ShipField(this), i);
        }
        this.isVertical = false;
    }

}
