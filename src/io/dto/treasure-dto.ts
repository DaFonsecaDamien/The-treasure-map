import {Treasure} from "../../domain/models/board-pieces/treasure";
import {Position} from "../../domain/models/value-object/position";

export class TreasureDto {
    constructor(
        public readonly position_x: number,
        public readonly position_y: number,
        public readonly quantity: number
    ) {
    }

    public toTreasure(): Treasure {
        return new Treasure(new Position(this.position_x, this.position_y), this.quantity);
    }
}
