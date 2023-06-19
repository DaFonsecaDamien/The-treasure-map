import {Mountain} from "../../../domain/models/board-pieces/mountain";

export class MountainResponse {
    static fromMountain(mountain: Mountain): string {
        return `M - ${mountain.getPosition().horizontalPosition} - ${mountain.getPosition().verticalPosition}`;
    }
}