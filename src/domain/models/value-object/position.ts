export class Position {
    private _horizontalPosition: number;
    private _verticalPosition: number;

    constructor(horizontalPosition: number, verticalPosition: number) {
        this._horizontalPosition = horizontalPosition;
        this._verticalPosition = verticalPosition;
    }

    get horizontalPosition(): number {
        return this._horizontalPosition;
    }

    get verticalPosition(): number {
        return this._verticalPosition;
    }

    equals(position: Position) {
        return this._horizontalPosition === position.horizontalPosition && this._verticalPosition === position.verticalPosition;
    }
}