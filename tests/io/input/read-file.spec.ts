import {FileReader} from "../../../src/io/input/file-reader";

describe('Read file', function () {
   it('Should read the file and return the content', function () {
       const filePath = 'tests/resources/valid-file';
       const fileReader = new FileReader(filePath);
       fileReader.read();
       expect(fileReader.getContent()).toEqual([
           'C - 3 - 4',
           'M - 1 - 0',
           'M - 2 - 1',
           'T - 0 - 3 - 2',
           'T - 1 - 3 - 3',
           'A - Lara - 1 - 1 - S - AADADAGGA'
       ])
   });
   it('should return an error if the file does not exist', function () {
         const filePath = 'tests/ressource/invalid-file';
         const fileReader = new FileReader(filePath);
         expect(() => fileReader.read()).toThrowError('File not found');
   });
});