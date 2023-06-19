export class InvalidMapException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidMapException";
    }
}