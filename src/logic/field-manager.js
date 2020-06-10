import {inactivePlayer, mode, modes} from "../cross-cutting/game";

export default class FieldManager {

    static setDroppedShip(field) {
        // set to playground
    }

    /**
     * Marks the enemy field on shipFields as hit
     * @param pos: Vector2
     */
    static fireOnPosition(pos) {
        inactivePlayer.playground.fields[pos.x * 10 + pos.y].isHit = true;
    }

    /**
     * Sets the background color of a field
     * @param field: Field
     */
    static setBackgroundColor(field) {
        let color;
        if (mode === modes.BATTLE) {
            if (field.hasShip && field.isHit) {
                color = "red";
            } else if (field.hasShip) {
                color = "green";
            } else if (field.isHit) {
                color = "blue";
            } else {
                color = "lightblue"
            }
        } else if (mode === modes.STRATEGY) {
            if (field.hasShip) {
                color = "purple";
            } else if (field.isNextToShip && !field.hasShip) {
                color = "lightcoral";
            } else {
                color = "lightblue"
            }
        }
        field.htmlElement.style.backgroundColor = color;
    }

}
