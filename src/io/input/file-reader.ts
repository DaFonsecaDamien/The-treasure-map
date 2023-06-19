import * as fs from 'fs';

export class FileReader {
    private readonly path: string;
    private content: string[];

    constructor(filePath: string) {
        this.path = filePath;
        this.content = [];
    }

    read(): void {
        try {
            this.content = fs.readFileSync(this.path, 'utf-8').split("\r\n");
        } catch (e) {
            throw new Error('File not found');
        }
    }

    getContent(): string[] {
        return this.content;
    }
}
