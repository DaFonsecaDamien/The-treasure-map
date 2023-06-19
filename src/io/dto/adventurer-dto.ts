import {Adventurer} from "../../domain/models/board-pieces/adventurer";
import {Orientation, OrientationEnum} from "../../domain/models/value-object/orientation";
import {Movement} from "../../domain/models/movement";
import {InvalidOrientationException} from "../../domain/exceptions/invalid-orientation-exception";
import {InvalidMovementException} from "../../domain/exceptions/invalid-movement-exception";

export class AdventurerDto {
    private name: string;
    private position_x: number;
    private position_y: number;
    private orientation: string;
    private movements: string;

    constructor(
        {
            name,
            position_x,
            position_y,
            orientation,
            movements
        }: {
            name: string,
            position_x: number,
            position_y: number,
            orientation: string,
            movements: string
        }) {
        this.name = name;
        this.position_x = position_x;
        this.position_y = position_y;
        this.orientation = orientation;
        this.movements = movements;
    }

    public toAdventurer(): Adventurer {
        return new Adventurer({
            name: this.name,
            position_x: this.position_x,
            position_y: this.position_y,
            orientation: new Orientation(this.orientationToEnum(this.orientation)),
            movements: this.movements.split('').map(movement => this.movementToEnum(movement))
        });
    }

    private orientationToEnum(orientation: string) {
        switch (orientation) {
            case 'N':
                return OrientationEnum.NORTH;
            case 'S':
                return OrientationEnum.SOUTH;
            case 'E':
                return OrientationEnum.EAST;
            case 'W':
                return OrientationEnum.WEST;
            default:
                throw new InvalidOrientationException(`Orientation ${orientation} is not valid`);
        }
    }

    private movementToEnum(movement: string) {
        switch (movement) {
            case 'A':
                return Movement.FORWARD;
            case 'G':
                return Movement.LEFT;
            case 'D':
                return Movement.RIGHT;
            default:
                throw new InvalidMovementException(`Movement ${movement} is not valid`);
        }
    }
}
