/**
 * Data class that holds a player.
 */
export default class Player {
    /**
     * id: The player id
     * nick: The player name
     * pin: The player password
     * avatar: The player avatar seed for an identicon
     */
    id;
    nick;
    pin;
    avatar;

    /**
     * Initializes a new player
     * @param id: The player id
     * @param nick: The player name
     * @param pin: The player password
     * @param avatar: The player avatar seed for an identicon
     */
    constructor(id, nick, pin, avatar) {
        this.id = id;
        this.nick = nick;
        this.pin = pin;
        this.avatar = avatar;
    }
}
