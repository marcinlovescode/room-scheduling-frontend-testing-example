import { Room } from "../src/pages/rooms/models"

const createData = (
    name: string,
    numberOfSeats: number,
    hasProjector: boolean,
    hasSoundSystem: boolean,
    hasAirConditioner: boolean,
): Room => {
    return { name, numberOfSeats, hasProjector, hasSoundSystem, hasAirConditioner }
}

export const rooms = (): Room[] =>
    [
        createData('Burning Desire', 10, true, true, true),
        createData('Fortune Seekers', 5, true, false, true),
        createData('Goal', 15, false, true, true),
        createData('Think Out Loud', 8, true, true, false),
    ]