export class InvalidContentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidContentException";
    }
}