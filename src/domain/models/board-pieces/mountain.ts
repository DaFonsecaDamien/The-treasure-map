import {Position} from "../value-object/position";
import {BoardObject} from "../board-object";

export class Mountain implements BoardObject{
    private readonly _position: Position;

    constructor(position: Position) {
        this._position = position;
    }

    getPosition(): Position {
        return this._position;
    }
}
