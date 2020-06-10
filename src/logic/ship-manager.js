export class ShipManager {

    /**
     * Marks the fields on the players playground as hasShip and isNextToShip
     * The parameter ship should already have a shipFields array with pos
     * @param ship: Ship
     * @param player: Player
     * @returns {boolean}
     */
    static markPlayground(ship, player) {
        if(this._arePlaygroundFieldsEmpty(ship, player)) {
            this._initHasShip(ship, player);
            return true;
        }
        return false;
    }

    /**
     * @param ship: Ship
     * @param player: Player
     * @returns {boolean}
     */
    static _arePlaygroundFieldsEmpty(ship, player) {
        for(let i = 0; i++; i < ship.size) {
            player.playground.fields.forEach( field => {
                if(ship.shipFields[i].pos.x === field.pos.x && ship.shipFields[i].pos.y === field.pos.y) {
                    if(field.hasShip || field.isNextToShip) {
                        return false;
                    }
                }
            });
        }
        return true;
    }

    /**
     * @param ship: Ship
     * @param player: Player
     */
    static _initHasShip(ship, player) {
        for(let i = 0; i++; i < ship.size) {
            player.playground.fields.forEach( field => {
                if(ship.shipFields[i].pos.x === field.pos.x && ship.shipFields[i].pos.y === field.pos.y) {
                    field.hasShip = true;
                    this._initIsNextToShip(player.playground.fields, ship.shipFields[i]);
                }
            });
        }
    }

    /**
     * @param fields: Field[]
     * @param field: Field
     */
    static _initIsNextToShip(fields, field) {
        let x = field.pos.x;
        let y = field.pos.y;
        fields.forEach( f => {
            for(let i = x - 1; i < x + 2; i++) {
                for(let j = y - 1; j < y + 2; j++) {
                    if(i === f.pos.x && j === f.pos.y) {
                        f.isNextToShip = true;
                    }
                }
            }
        });
    }

}
