import {Position} from "../value-object/position";
import {Movement} from "../movement";
import {Orientation, OrientationEnum} from "../value-object/orientation";
import {BoardObject} from "../board-object";
import {TreasureMap} from "./treasure-map";
import {CellType} from "../cell-type";

export class Adventurer implements BoardObject {
    private _name: string;
    private _position: Position;
    private _orientation: Orientation;
    private _movements: Movement[];
    private _treasureQuantity: number;

    constructor({
                    name,
                    position_x,
                    position_y,
                    orientation,
                    movements,
                }: {
        name: string;
        position_x: number;
        position_y: number;
        orientation: Orientation;
        movements: Movement[];
    }) {
        this._name = name;
        this._position = new Position(position_x, position_y);
        this._orientation = orientation;
        this._movements = movements;
        this._treasureQuantity = 0;
    }

    public playMove(treasureMap: TreasureMap): boolean {
        const nextPosition = this.simulateMove();
        if (!nextPosition) {
            return false;
        }

        if (this.isBlocked(treasureMap, nextPosition)) {
            return true;
        }

        if(!treasureMap.isPositionInsideMap(nextPosition)) {
            return true;
        }

        if (treasureMap.isAdventurerOnTreasure(nextPosition) && treasureMap.isTreasureAvailable(nextPosition)) {
            this._treasureQuantity++;
            treasureMap.pickUpTreasure(nextPosition);
        }

        this._position = nextPosition;
        return true;
    }

    public simulateMove(): Position | undefined {
        const nextMove = this._movements.shift();

        if (!nextMove) return undefined;
        switch (nextMove) {
            case Movement.FORWARD:
                return this.moveForward();
            case Movement.LEFT:
                this._orientation = this._orientation.rotateLeft();
                break;
            case Movement.RIGHT:
                this._orientation = this._orientation.rotateRight();
                break;
        }
        return this._position;
    }

    private moveForward(): Position {
        switch (this._orientation.value) {
            case OrientationEnum.NORTH:
                return new Position(
                    this._position.horizontalPosition,
                    this._position.verticalPosition - 1
                );
            case OrientationEnum.EAST:
                return new Position(
                    this._position.horizontalPosition + 1,
                    this._position.verticalPosition
                );
            case OrientationEnum.SOUTH:
                return new Position(
                    this._position.horizontalPosition,
                    this._position.verticalPosition + 1
                );
            case OrientationEnum.WEST:
                return new Position(
                    this._position.horizontalPosition - 1,
                    this._position.verticalPosition
                );
        }
    }

    isBlocked(treasureMap: TreasureMap, position: Position): boolean {
        return (
            treasureMap.getCellType(position) === CellType.MOUNTAIN ||
            treasureMap.getCellType(position) === CellType.ADVENTURER ||
            treasureMap.getCellType(position) === CellType.ADVENTURER_ON_TREASURE
        );
    }

    public get name(): string {
        return this._name;
    }

    get orientation(): Orientation {
        return this._orientation;
    }

    get treasureQuantity(): number {
        return this._treasureQuantity;
    }

    getPosition(): Position {
        return this._position;
    }
}
