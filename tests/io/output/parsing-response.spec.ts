import {Adventurer} from "../../../src/domain/models/board-pieces/adventurer";
import {Orientation, OrientationEnum} from "../../../src/domain/models/value-object/orientation";
import {Movement} from "../../../src/domain/models/movement";
import {MapDimensions} from "../../../src/domain/models/value-object/map-dimensions";
import {Mountain} from "../../../src/domain/models/board-pieces/mountain";
import {Position} from "../../../src/domain/models/value-object/position";
import {Treasure} from "../../../src/domain/models/board-pieces/treasure";
import {Game} from "../../../src/usecase/treasure-map-game/game";
import {GameResponse} from "../../../src/io/output/response-type/game-response";

describe('Parsing the content in a user friendly response', function () {
    let game = new Game();

    beforeEach(function () {
        game = new Game();
    });

    it('should parse the result content of the game and return a response', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.FORWARD, Movement.LEFT, Movement.FORWARD, Movement.LEFT, Movement.FORWARD, Movement.FORWARD]
        });

        const adventurer2: Adventurer = new Adventurer({
            name: 'Indiana',
            position_x: 2,
            position_y: 3,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD, Movement.FORWARD, Movement.RIGHT, Movement.RIGHT, Movement.FORWARD, Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 4),
            mountains: [new Mountain(new Position(1, 0)), new Mountain(new Position(2, 1))],
            treasures: [new Treasure(new Position(0, 3), 2), new Treasure(new Position(1, 3), 3)],
            adventurers: [adventurer1, adventurer2]
        });

        const resultResponse = new GameResponse({
            treasureMap: treasureMap,
            adventurers: treasureMap.adventurers,
            mountains: treasureMap.mountains,
            treasures: treasureMap.treasures
        }).toResponse();

        expect(resultResponse).toEqual("C - 3 - 4\n" +
            "M - 1 - 0\n" +
            "M - 2 - 1\n" +
            "T - 1 - 3 - 1\n" +
            "A - Lara - 0 - 3 - S - 1\n" +
            "A - Indiana - 2 - 3 - E - 3");
    });
    it('should parse the content to display it as a board game', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.FORWARD, Movement.LEFT, Movement.FORWARD, Movement.LEFT, Movement.FORWARD, Movement.FORWARD]
        });

        const adventurer2: Adventurer = new Adventurer({
            name: 'Indiana',
            position_x: 2,
            position_y: 3,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD, Movement.FORWARD, Movement.RIGHT, Movement.RIGHT, Movement.FORWARD, Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 4),
            mountains: [new Mountain(new Position(1, 0)), new Mountain(new Position(2, 1))],
            treasures: [new Treasure(new Position(0, 3), 2), new Treasure(new Position(1, 3), 3)],
            adventurers: [adventurer1, adventurer2]
        });

        const resultResponse = new GameResponse({
            treasureMap: treasureMap,
            adventurers: treasureMap.adventurers,
            mountains: treasureMap.mountains,
            treasures: treasureMap.treasures
        }).toBoardResponse();

        expect(resultResponse).toEqual(". M .\n. . M\n. . .\nA(Lara) T(1) A(Indiana)");
    });
});
