import {DESELECT_SHIP, DISABLE_SHIP, SELECT_SHIP} from "../actions/select-ship-action";
import {SET_INITIAL_STATE} from "../actions/initial-state-action";

/**
 * Specifies the initial state for all ships.
 * @type {({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[]}
 */
const initialStateShips = [
    {
        id: 0,
        name: "Battleship",
        size: 5,
        selected: false,
        disabled: false
    },
    {
        id: 0,
        name: "Cruiser",
        size: 4,
        selected: false,
        disabled: false
    },
    {
        id: 1,
        name: "Cruiser",
        size: 4,
        selected: false,
        disabled: false
    },
    {
        id: 0,
        name: "Destroyer",
        size: 3,
        selected: false,
        disabled: false
    },
    {
        id: 1,
        name: "Destroyer",
        size: 3,
        selected: false,
        disabled: false
    },
    {
        id: 2,
        name: "Destroyer",
        size: 3,
        selected: false,
        disabled: false
    },
    {
        id: 0,
        name: "Submarine",
        size: 2,
        selected: false,
        disabled: false
    },
    {
        id: 1,
        name: "Submarine",
        size: 2,
        selected: false,
        disabled: false
    },
    {
        id: 2,
        name: "Submarine",
        size: 2,
        selected: false,
        disabled: false
    },
    {
        id: 3,
        name: "Submarine",
        size: 2,
        selected: false,
        disabled: false
    }
];

/**
 * Specifies the initial store state.
 * @type {{PLAYER1FULL: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[], PLAYER1PART: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[], PLAYER2FULL: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[], PLAYER2PART: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[]}}
 */
const initialState = {
    PLAYER1FULL: initialStateShips,
    PLAYER2FULL: initialStateShips,
    PLAYER1PART: initialStateShips,
    PLAYER2PART: initialStateShips
};

/**
 * Specifies how to state changes in response to actions.
 * @param state: The store state of this reducer
 * @param action: The payload created by the action
 * @returns {{PLAYER1FULL: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[], PLAYER1PART: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[], PLAYER2FULL: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[], PLAYER2PART: ({size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean}|{size: number, name: string, disabled: boolean, id: number, selected: boolean})[]}}
 */
export function shipReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * Handles selectShipAction response.
         */
        case SELECT_SHIP:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(ship => {
                    if (ship.id === action.data.id && ship.name === action.data.name) {
                        return Object.assign({}, ship, {
                            selected: true,
                            disabled: false
                        })
                    }
                    return ship;
                })
            });
        /**
         * Handles deselectShipAction response.
         */
        case DESELECT_SHIP:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(ship => {
                    if (ship.id === action.data.id && ship.name === action.data.name) {
                        return Object.assign({}, ship, {
                            selected: false,
                            disabled: false
                        })
                    }
                    return ship;
                })
            });
        /**
         * Handles disableShipAction response.
         */
        case DISABLE_SHIP:
            return Object.assign({}, state, {
                [action.playground]: state[action.playground].map(ship => {
                    if (ship.id === action.data.id && ship.name === action.data.name) {
                        return Object.assign({}, ship, {
                            disabled: true,
                            selected: false
                        })
                    }
                    return ship;
                })
            });
        /**
         * Handles setInitialStateAction response.
         */
        case SET_INITIAL_STATE:
            return initialState;
        default:
            return state;
    }
}

/**
 * Parse a ship by id.
 * @param id: The ship id
 * @returns {{size: *, name: *, index: number, id: number}}
 */
export function parseShip(id) {
    const regex = /^(\S+)-(\d+)-(\d+)$/;
    const match = id.match(regex);

    let shipName = capitalizeFirstLetter(match[1]);
    let shipId = Number(match[2]);
    let shipSize = getShipLength(id);
    return {
        name: shipName,
        id: shipId,
        size: shipSize,
        index: Number(match[3])
    };
}

/**
 * Capitalizes the first letter of a string.
 * @param string: The string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Converts a ship id to the ship length.
 * @param id: The ship id
 * @returns {number}
 */
export function getShipLength(id) {
    let shipSize;
    if (id.startsWith("submarine")) {
        shipSize = 2
    } else if (id.startsWith("destroyer")) {
        shipSize = 3
    } else if (id.startsWith("cruiser")) {
        shipSize = 4
    } else {
        shipSize = 5
    }
    return shipSize;
}
