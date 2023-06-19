import {TreasureMap} from "../../domain/models/board-pieces/treasure-map";
import {MapDimensions} from "../../domain/models/value-object/map-dimensions";
import {Mountain} from "../../domain/models/board-pieces/mountain";
import {Treasure} from "../../domain/models/board-pieces/treasure";
import {Adventurer} from "../../domain/models/board-pieces/adventurer";

export class Game {
    public start(
        {
            dimensions,
            mountains,
            treasures,
            adventurers
        }: {
            dimensions: MapDimensions,
            mountains: Mountain[],
            treasures: Treasure[],
            adventurers: Adventurer[]
        }): TreasureMap {
        const treasureMap = new TreasureMap({
            dimensions,
            mountains,
            treasures,
            adventurers
        });
        treasureMap.start();
        return treasureMap;
    }
}