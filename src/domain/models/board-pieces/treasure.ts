import {Position} from "../value-object/position";
import {BoardObject} from "../board-object";

export class Treasure implements BoardObject{
    private readonly _position: Position;
    private _quantity: number;

    constructor(position: Position, quantity: number) {
        this._position = position;
        this._quantity = quantity;
    }

    public pickUpTreasure(): void {
        if (this._quantity - 1 < 0) {
            return;
        }
        this._quantity--;
    }

    getPosition(): Position {
        return this._position;
    }

    get quantity(): number {
        return this._quantity;
    }
}
