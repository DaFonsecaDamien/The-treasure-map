import * as fs from "fs";

export class FileWriter {
    private _filePath: string;

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    async write(data: string) {
        await fs.writeFile(this._filePath, data, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
