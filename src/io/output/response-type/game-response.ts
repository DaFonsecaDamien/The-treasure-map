import {TreasureMap} from "../../../domain/models/board-pieces/treasure-map";
import {Treasure} from "../../../domain/models/board-pieces/treasure";
import {Mountain} from "../../../domain/models/board-pieces/mountain";
import {Adventurer} from "../../../domain/models/board-pieces/adventurer";
import {MountainResponse} from "./mountain-response";
import {TreasureResponse} from "./treasure-response";
import {AdventurerResponse} from "./adventurer-response";
import {MapResponse} from "./map-response";

export class GameResponse {
    treasureMap: TreasureMap;
    adventurers: Adventurer[];
    mountains: Mountain[];
    treasures: Treasure[];

    constructor(
        {
            treasureMap,
            adventurers,
            mountains,
            treasures,
        }:{
            treasureMap: TreasureMap;
            adventurers: Adventurer[];
            mountains: Mountain[];
            treasures: Treasure[];
        }) {
        this.treasureMap = treasureMap;
        this.adventurers = adventurers;
        this.mountains = mountains;
        this.treasures = treasures;
    }

    public toResponse(): string {
        return [
            MapResponse.fromMap(this.treasureMap.dimensions),
            ...this.mountains.map(mountain => MountainResponse.fromMountain(mountain)),
            ...this.treasures.map(treasure => TreasureResponse.fromTreasure(treasure)),
            ...this.adventurers.map(adventurer => AdventurerResponse.fromAdventurer(adventurer))
        ].join("\n").replace(/\n\n/g, "\n");
    }

    public toBoardResponse(): string {
        const board: string[][] = [];

        for (let y = 0; y < this.treasureMap.dimensions.mapDimensions.height; y++) {
            board[y] = [];
            for (let x = 0; x < this.treasureMap.dimensions.mapDimensions.width; x++) {
                board[y][x] = ".";
            }
        }

        this.mountains.forEach(mountain => {
            board[mountain.getPosition().verticalPosition][mountain.getPosition().horizontalPosition] = "M";
        });

        this.treasures.forEach(treasure => {
            board[treasure.getPosition().verticalPosition][treasure.getPosition().horizontalPosition] = `T(${treasure.quantity})`;
        });

        this.adventurers.forEach(adventurer => {
            board[adventurer.getPosition().verticalPosition][adventurer.getPosition().horizontalPosition] = `A(${adventurer.name})`;
        });

        return board.map(line => line.join(" ")).join("\n");
    }
}
