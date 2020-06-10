export default class ShipFieldManager {


    static getDraggedShip(shipField) {
        // take the whole ship div/tr and drag it remember which td is dragged and set wasSet/isActive
        // set pos of shipFields of the ship from shipField
    }

    static setBackgroundColorWhenOnDragEnter(shipField) {
        // use ondragenter event to set green and red color if its valid or not
        // use the ShipManager.markPlayground method
    }


    /**
     * Sets the background color of a ship field
     * @param shipField: ShipField
     */
    static setBackgroundColor(shipField) {
        let color;
        let text;
        if (shipField.isActive) {
            color = "green";
            text = "none";
        } else if (shipField.wasSet) {
            color = "grey";
            text = "line-through";
        } else {
            color = "purple";
            text = "none";
        }
        shipField.ship.htmlElement.style.textDecoration = text;
        shipField.htmlElement.style.backgroundColor = color;
    }

}
