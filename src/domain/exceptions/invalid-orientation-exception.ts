export class InvalidOrientationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidOrientationException";
    }
}