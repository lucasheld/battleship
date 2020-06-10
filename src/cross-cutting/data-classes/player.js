import Playground from "./playground";
import {GameManager} from "../../logic/game-manager";

export default class Player {

    nick;
    pin;
    avatar;
    ships;
    playground;

    constructor() {
        this.playground = new Playground();
        GameManager.initShips(this);
    }

    /**
     * @param nick: string
     * @param pin: number
     * @param avatar: number
     */
    setAttributes(nick, pin, avatar) {
        this.nick = nick;
        this.pin = pin;
        this.avatar = avatar;
    }

}
