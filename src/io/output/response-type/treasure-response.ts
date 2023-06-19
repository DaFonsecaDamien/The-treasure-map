import {Treasure} from "../../../domain/models/board-pieces/treasure";

export class TreasureResponse {
    static fromTreasure(treasure: Treasure): string {
        if (treasure.quantity === 0)
            return "";
        return `T - ${treasure.getPosition().horizontalPosition} - ${treasure.getPosition().verticalPosition} - ${treasure.quantity}`;
    }
}