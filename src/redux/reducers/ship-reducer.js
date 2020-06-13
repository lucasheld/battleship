export const shipReducer = () => {
    return [
        {
            id: 0,
            name: "Battleship",
            size: 5
        },
        {
            id: 0,
            name: "Cruiser",
            size: 4
        },
        {
            id: 1,
            name: "Cruiser",
            size: 4
        },
        {
            id: 0,
            name: "Destroyer",
            size: 3
        },
        {
            id: 1,
            name: "Destroyer",
            size: 3
        },
        {
            id: 2,
            name: "Destroyer",
            size: 3
        },
        {
            id: 0,
            name: "Submarine",
            size: 2
        },
        {
            id: 1,
            name: "Submarine",
            size: 2
        },
        {
            id: 2,
            name: "Submarine",
            size: 2
        },
        {
            id: 3,
            name: "Submarine",
            size: 2
        }
    ]
};

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

