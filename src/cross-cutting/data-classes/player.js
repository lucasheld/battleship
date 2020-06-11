import Playground from "./playground";
import {GameManager} from "../../logic/game-manager";

export default class Player {

    id;
    nick;
    pin;
    avatar;
    ships;
    playground;

    constructor(id) {
        this.id = id;
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
