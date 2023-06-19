import {AdventurerDto} from "../dto/adventurer-dto";
import {MountainDto} from "../dto/mountain-dto";
import {TreasureDto} from "../dto/treasure-dto";
import {MapDimensionsDto} from "../dto/map-dimensions-dto";
import {InvalidMapException} from "../../domain/exceptions/invalid-map-exception";
import {InvalidContentException} from "../../domain/exceptions/invalid-content-exception";

export class Parser {
    private readonly lines: string[];

    constructor(content: string[]) {
        this.lines = content;
    }

    parse(): {
        map: MapDimensionsDto,
        mountains: MountainDto[],
        treasures: TreasureDto[],
        adventurers: AdventurerDto[]
    } {
        const map = this.parseMap(this.lines[0]);
        const {mountains, treasures, adventurers} = this.parseContent();
        return {map, mountains, treasures, adventurers};
    }

    private parseMap(line: string): MapDimensionsDto {
        const [type, width, height] = line.split(' - ');
        if (type !== 'C' || !width || !height || parseInt(width) <= 0 || parseInt(height) <= 0) {
            throw new InvalidMapException(`Invalid map: ${line}`)
        }
        return new MapDimensionsDto(parseInt(width), parseInt(height));
    }

    private parseContent(): {
        mountains: MountainDto[],
        treasures: TreasureDto[],
        adventurers: AdventurerDto[]
    } {
        const mountains: MountainDto[] = [];
        const treasures: TreasureDto[] = [];
        const adventurers: AdventurerDto[] = [];
        this.lines.slice(1).forEach(line => {
            const [type, ...rest] = line.split(' - ');
            switch (type) {
                case 'M':
                    mountains.push(this.parseMountain(rest));
                    break;
                case 'T':
                    treasures.push(this.parseTreasure(rest));
                    break;
                case 'A':
                    adventurers.push(this.parseAdventurer(rest));
                    break;
                default:
                    throw new InvalidContentException(`Invalid content: ${line}`)
            }
        });
        return {mountains, treasures, adventurers};
    }

    private parseMountain([position_x, position_y]: string[]): MountainDto {
        return new MountainDto(parseInt(position_x), parseInt(position_y));
    }

    private parseTreasure([position_x, position_y, quantity]: string[]): TreasureDto {
        return new TreasureDto(parseInt(position_x), parseInt(position_y), parseInt(quantity));
    }

    private parseAdventurer([name, position_x, position_y, orientation, movements]: string[]): AdventurerDto {
        return new AdventurerDto({
            name,
            position_x: parseInt(position_x),
            position_y: parseInt(position_y),
            orientation,
            movements
        });
    }
}
