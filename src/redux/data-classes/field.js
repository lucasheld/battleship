export default class Field {
    id;
    type;
    color;
    shipIndex;
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.color = "field-unused";
        this.shipIndex = -1;
    }
}
