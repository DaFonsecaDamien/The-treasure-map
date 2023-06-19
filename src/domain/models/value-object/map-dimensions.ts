export class MapDimensions {
    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get mapDimensions(): { width: number; height: number } {
        return {
            width: this._width,
            height: this._height
        }
    }
}