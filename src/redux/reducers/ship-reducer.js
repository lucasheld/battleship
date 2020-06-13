import {SELECT_SHIP} from "../actions/select-ship-action";

const initialState = [
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
]

export function shipReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_SHIP:
            return state.map(ship => {
                if (ship.id === action.data.id && ship.name === action.data.name) {
                    return Object.assign({}, ship, {
                        selected: true
                    })
                }
                return ship;
            });
        default:
            return state;
    }
}

export function parseShip(id) {
    const regex = /^(\S+)-(\d+)-(\d+)$/;
    const match = id.match(regex);
    return {
        name: capitalizeFirstLetter(match[1]),
        id: Number(match[2]),
        index: Number(match[3])
    };
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
