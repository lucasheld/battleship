import Battleship from "../cross-cutting/data-classes/ships/battleship";
import Cruiser from "../cross-cutting/data-classes/ships/cruiser";
import Destroyer from "../cross-cutting/data-classes/ships/destroyer";
import Submarine from "../cross-cutting/data-classes/ships/submarine";
import {inactivePlayer, player0, player1, mode, modes} from "../cross-cutting/game";

export class GameManager {

    /**
     * Sets player 0 inactive
     */
    static setPlayer0Inactive() {
        inactivePlayer = player0;
    }

    /**
     * Sets player 1 inactive
     */
    static setPlayer1Inactive() {
        inactivePlayer = player1;
    }

    /**
     * Sets the strategy mode
     */
    static setStrategyModus() {
        mode = modes.STRATEGY;
    }

    /**
     * Sets the battle mode
     */
    static setBattleModus() {
        mode = modes.BATTLE;
    }

    /**
     * Initialise some ships for player
     * @param player: Player
     */
    static initShips(player) {
        player.ships = this._initShips(1, 2, 3, 4);
    }

    /**
     * @param battleshipAmount: number
     * @param cruiserAmount: number
     * @param destroyerAmount: number
     * @param submarineAmount: number
     * @returns {Array}
     */
    static _initShips(battleshipAmount, cruiserAmount, destroyerAmount, submarineAmount) {
        let ships = [];
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
        return ships;
    }

}
