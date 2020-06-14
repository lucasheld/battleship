/**
 * Data class that holds a field.
 */
export default class Field {
    /**
     * id: The field id
     * type: The field type
     * color: The field color
     * shipIndex: The field index within a ship
     */
    id;
    type;
    color;
    shipIndex;

    /**
     * Initializes a new field
     * @param id: The field id
     * @param type: The field type
     */
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.color = "field-unused";
        this.shipIndex = -1;
    }
}
