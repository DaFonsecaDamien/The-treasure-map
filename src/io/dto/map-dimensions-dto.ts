import {MapDimensions} from "../../domain/models/value-object/map-dimensions";

export class MapDimensionsDto {
    constructor(public readonly width: number, public readonly height: number) {
    }

    toMapDimensions(): MapDimensions {
        return new MapDimensions(this.width, this.height);
    }
}
