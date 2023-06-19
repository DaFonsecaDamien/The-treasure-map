import { FileReader } from "./io/input/file-reader";
import { Parser } from "./io/input/parser";
import { Game } from "./usecase/treasure-map-game/game";
import { FileWriter } from "./io/output/file-writer";
import { GameResponse } from "./io/output/response-type/game-response";

enum ResponseType {
    Normal,
    Board
}

function main(filepath: string, outputFilePath: string, responseType: ResponseType) {
    const fileReader = new FileReader(filepath);
    fileReader.read();
    const content = fileReader.getContent();

    const parser = new Parser(content);
    const parsedContent = parser.parse();

    const game = new Game();

    const adventurers = parsedContent.adventurers.map((adventurerDto) =>
        adventurerDto.toAdventurer()
    );
    const mountains = parsedContent.mountains.map((mountainDto) =>
        mountainDto.toMountain()
    );
    const treasures = parsedContent.treasures.map((treasureDto) =>
        treasureDto.toTreasure()
    );
    const dimensions = parsedContent.map.toMapDimensions();

    const data = game.start({
        adventurers,
        mountains,
        treasures,
        dimensions,
    });

    const simulationResult = new GameResponse({
        treasureMap: data,
        adventurers: data.adventurers,
        mountains: data.mountains,
        treasures: data.treasures,
    });

    const fileWriter = new FileWriter(outputFilePath);

    if (responseType === ResponseType.Normal) {
        fileWriter.write(simulationResult.toResponse());
    } else if (responseType === ResponseType.Board) {
        fileWriter.write(simulationResult.toBoardResponse());
    }
}

const inputFilePath = 'src/files/valid-file';
const outputFilePath = 'src/files/output-file';
const responseType = ResponseType.Normal; // Change this to ResponseType.Normal or ResponseType.Board as desired
main(inputFilePath, outputFilePath, responseType);
