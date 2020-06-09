import {ships} from "../cross-cutting/model";
import Battleship from "../cross-cutting/data-classes/ships/battleship";
import Cruiser from "../cross-cutting/data-classes/ships/cruiser";
import Destroyer from "../cross-cutting/data-classes/ships/destroyer";
import Submarine from "../cross-cutting/data-classes/ships/submarine";

export class GameManager {

    static initShips(battleshipAmount, cruiserAmount, destroyerAmount, submarineAmount) {
        for(let i = 0; i < battleshipAmount; i++) {
            ships.push(new Battleship())
        }
        for(let i = 0; i < cruiserAmount; i++) {
            ships.push(new Cruiser())
        }
        for(let i = 0; i < destroyerAmount; i++) {
            ships.push(new Destroyer())
        }
        for(let i = 0; i < submarineAmount; i++) {
            ships.push(new Submarine())
        }
    }

}
