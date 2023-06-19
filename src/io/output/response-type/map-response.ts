import {MapDimensions} from "../../../domain/models/value-object/map-dimensions";

export class MapResponse {
    static fromMap(map: MapDimensions): string {
        return `C - ${map.mapDimensions.width} - ${map.mapDimensions.height}`;
    }
}