import {Mountain} from "../../domain/models/board-pieces/mountain";
import {Position} from "../../domain/models/value-object/position";

export class MountainDto {
    constructor(public readonly position_x: number, public readonly position_y: number) {
    }

    public toMountain(): Mountain {
        return new Mountain(new Position(this.position_x, this.position_y));
    }
}
