import {FileWriter} from "../../../src/io/output/file-writer";
import * as fs from "fs"

describe('Write File', function () {

    const filePath = "tests/resources/output-file";

    afterEach(async () => {
        await fs.unlink(filePath, (err) => {
            if (err) {
                throw err;
            }
        });
    });

    it('should write the content in a file', async function () {
        const fileWriter = new FileWriter(filePath);

        const data = "C - 3 - 4\n" +
            "M - 1 - 0\n" +
            "M - 2 - 1\n" +
            "T - 0 - 3 - 2\n" +
            "T - 1 - 3 - 3\n" +
            "A - Lara - 1 - 1 - S - AADADAGGA";

        await fileWriter.write(data)
        const resultData = await fs.promises.readFile(filePath, 'utf8');
        expect(resultData).toEqual(data);
    });
});
