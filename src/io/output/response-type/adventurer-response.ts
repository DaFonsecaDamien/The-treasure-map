import {Adventurer} from "../../../domain/models/board-pieces/adventurer";

export class AdventurerResponse {
    static fromAdventurer(adventurer: Adventurer): string {
        return `A - ${adventurer.name} - ${adventurer.getPosition().horizontalPosition} - ${adventurer.getPosition().verticalPosition} - ${adventurer.orientation.value} - ${adventurer.treasureQuantity}`;
    }
}
