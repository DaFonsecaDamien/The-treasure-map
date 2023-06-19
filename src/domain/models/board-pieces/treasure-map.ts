import { MapDimensions } from "../value-object/map-dimensions";
import { Adventurer } from "./adventurer";
import { Treasure } from "./treasure";
import { Mountain } from "./mountain";
import { CellType } from "../cell-type";
import { Position } from "../value-object/position";

export class TreasureMap {
    private readonly _dimensions: MapDimensions;
    private readonly _mountains: Mountain[];
    private readonly _treasures: Treasure[];
    private readonly _adventurers: Adventurer[];

    private readonly _map: CellType[][];

    constructor({
                    dimensions,
                    mountains,
                    treasures,
                    adventurers,
                }: {
        dimensions: MapDimensions;
        mountains: Mountain[];
        treasures: Treasure[];
        adventurers: Adventurer[];
    }) {
        this._dimensions = dimensions;
        this._mountains = mountains;
        this._treasures = treasures;
        this._adventurers = adventurers;
        this._map = this.createMap();
    }

    start(): void {
        let adventurerFinished = 0;
        let adventurerIndex = 0;

        while (adventurerFinished < this._adventurers.length) {
            const adventurer = this._adventurers[adventurerIndex];
            const playedTurn = this.playTurn(adventurer);

            if (!playedTurn) {
                adventurerFinished++;
            }

            adventurerIndex = (adventurerIndex + 1) % this._adventurers.length;
        }
    }

    playTurn(adventurer: Adventurer): boolean {
        const initialPosition = adventurer.getPosition();
        const nextPosition = adventurer.playMove(this);

        if (!nextPosition) {
            return false;
        }

        const newPosition = adventurer.getPosition();

        if (!initialPosition.equals(newPosition)) {
            this.updateAdventurerPosition(initialPosition, newPosition);
        }

        return true;
    }

    private createMap(): CellType[][] {
        const map: CellType[][] = [];

        for (let i = 0; i < this._dimensions.mapDimensions.height; i++) {
            map[i] = [];

            for (let j = 0; j < this._dimensions.mapDimensions.width; j++) {
                map[i][j] = CellType.PLAIN;
            }
        }

        this._mountains.forEach((mountain) => {
            map[mountain.getPosition().verticalPosition][
                mountain.getPosition().horizontalPosition
                ] = CellType.MOUNTAIN;
        });

        this._treasures.forEach((treasure) => {
            map[treasure.getPosition().verticalPosition][
                treasure.getPosition().horizontalPosition
                ] = CellType.TREASURE;
        });

        this._adventurers.forEach((adventurer) => {
            map[adventurer.getPosition().verticalPosition][
                adventurer.getPosition().horizontalPosition
                ] = CellType.ADVENTURER;
        });

        return map;
    }

    getCellType(position: Position): CellType {
        return this._map[position.verticalPosition][position.horizontalPosition];
    }

    isPositionInsideMap(position: Position): boolean {
        return (
            position.verticalPosition >= 0 &&
            position.verticalPosition < this._dimensions.mapDimensions.height &&
            position.horizontalPosition >= 0 &&
            position.horizontalPosition < this._dimensions.mapDimensions.width
        );
    }

    isAdventurerOnTreasure(position: Position): boolean {
        return this.getCellType(position) === CellType.TREASURE;
    }

    isTreasureAvailable(position: Position): boolean | undefined {
        const treasure = this._treasures.find((treasure) =>
            treasure.getPosition().equals(position)
        );
        return treasure && treasure.quantity > 0;
    }

    pickUpTreasure(position: Position): void {
        this._treasures.find((treasure) =>
            treasure.getPosition().equals(position)
        )?.pickUpTreasure();
    }

    updateAdventurerPosition(
        initialPosition: Position,
        newPosition: Position
    ): void {
        const initialCellType = this.getCellType(initialPosition);
        const newCellType = this.getCellType(newPosition);

        if (newCellType === CellType.TREASURE) {
            this._map[newPosition.verticalPosition][
                newPosition.horizontalPosition
                ] = CellType.ADVENTURER_ON_TREASURE;
        } else {
            this._map[newPosition.verticalPosition][
                newPosition.horizontalPosition
                ] = CellType.ADVENTURER;
        }

        if (initialCellType === CellType.ADVENTURER_ON_TREASURE) {
            this._map[initialPosition.verticalPosition][
                initialPosition.horizontalPosition
                ] = CellType.TREASURE;
        } else {
            this._map[initialPosition.verticalPosition][
                initialPosition.horizontalPosition
                ] = CellType.PLAIN;
        }
    }

    get dimensions(): MapDimensions {
        return this._dimensions;
    }

    get mountains(): Mountain[] {
        return this._mountains;
    }

    get treasures(): Treasure[] {
        return this._treasures;
    }

    get adventurers(): Adventurer[] {
        return this._adventurers;
    }

    get map(): CellType[][] {
        return this._map;
    }
}
