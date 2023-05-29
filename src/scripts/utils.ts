import { CELL_SIZE } from "./game"

export const coordToPosition = (coordinate: {x: number, y: number}) => {
    return {x: CELL_SIZE* coordinate.x, y: CELL_SIZE* coordinate.y}
}