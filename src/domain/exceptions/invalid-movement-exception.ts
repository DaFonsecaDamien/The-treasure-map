export class InvalidMovementException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidMovementException";
    }
}