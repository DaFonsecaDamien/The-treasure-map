import {Parser} from "../../../src/io/input/parser";
import {MountainDto} from "../../../src/io/dto/mountain-dto";
import {TreasureDto} from "../../../src/io/dto/treasure-dto";
import {AdventurerDto} from "../../../src/io/dto/adventurer-dto";
import {MapDimensionsDto} from "../../../src/io/dto/map-dimensions-dto";
import {InvalidContentException} from "../../../src/domain/exceptions/invalid-content-exception";
import {InvalidMapException} from "../../../src/domain/exceptions/invalid-map-exception";

describe('Parsing Content', function () {
    let parser: Parser;
    it('Should parse the content and create object based on DTO', function () {
        parser = new Parser([
            'C - 3 - 4',
            'M - 1 - 1',
            'M - 2 - 2',
            'T - 0 - 3 - 2',
            'T - 1 - 3 - 1',
            'A - Lara - 1 - 1 - S - AADADAGGA'
        ]);
        expect(parser.parse()).toEqual({
            map: new MapDimensionsDto(3, 4),
            mountains: [new MountainDto(1, 1), new MountainDto(2, 2)],
            treasures: [new TreasureDto(0, 3, 2), new TreasureDto(1, 3, 1)],
            adventurers: [new AdventurerDto({
                name: 'Lara',
                position_x: 1,
                position_y: 1,
                orientation: 'S',
                movements: 'AADADAGGA'
            })]
        });
    });
    it('Should parse and return an error if the content is invalid', function () {
        parser = new Parser([
            'C - 3 - 4',
            'Z - 2 - 2',
            'T - 0 - 3 - 2',
            'T - 1 - 3 - 1',
            'A - Lara - 1 - 1 - S - AADADAGGA',
        ]);
        expect(() => parser.parse()).toThrowError(InvalidContentException);
    });
    it('Should parse and return an error if the map is invalid', function () {
        parser = new Parser([
            'C - -5 - 4',
            'M - 2 - 2',
            'T - 0 - 3 - 2',
            'T - 1 - 3 - 1',
            'A - Lara - 1 - 1 - S - AADADAGGA'
        ]);
        expect(() => parser.parse()).toThrowError(InvalidMapException);
    });
});