export enum OrientationEnum {
    NORTH = "N",
    EAST = "E",
    SOUTH = "S",
    WEST = "O"
}

export class Orientation {
    constructor(private orientation: OrientationEnum) {}

    rotateLeft(): Orientation {
        switch (this.orientation) {
            case OrientationEnum.NORTH:
                return new Orientation(OrientationEnum.WEST);
            case OrientationEnum.EAST:
                return new Orientation(OrientationEnum.NORTH);
            case OrientationEnum.SOUTH:
                return new Orientation(OrientationEnum.EAST);
            case OrientationEnum.WEST:
                return new Orientation(OrientationEnum.SOUTH);
        }
    }

    rotateRight(): Orientation {
        switch (this.orientation) {
            case OrientationEnum.NORTH:
                return new Orientation(OrientationEnum.EAST);
            case OrientationEnum.EAST:
                return new Orientation(OrientationEnum.SOUTH);
            case OrientationEnum.SOUTH:
                return new Orientation(OrientationEnum.WEST);
            case OrientationEnum.WEST:
                return new Orientation(OrientationEnum.NORTH);
        }
    }

    get value(): OrientationEnum {
        return this.orientation;
    }
}