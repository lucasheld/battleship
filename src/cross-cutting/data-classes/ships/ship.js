export default class Ship {

    id;
    name;
    size;
    position;
    hitPoints;

    constructor(id, name, size) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.hitPoints = size;
    }

    set position(position) {
        this.position = position;
    }

}
