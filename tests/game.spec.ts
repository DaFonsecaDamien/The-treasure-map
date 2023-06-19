import {Game} from "../src/usecase/treasure-map-game/game";
import {Adventurer} from "../src/domain/models/board-pieces/adventurer";
import {Orientation, OrientationEnum} from "../src/domain/models/value-object/orientation";
import {Movement} from "../src/domain/models/movement";
import {MapDimensions} from "../src/domain/models/value-object/map-dimensions";
import {Treasure} from "../src/domain/models/board-pieces/treasure";
import {Position} from "../src/domain/models/value-object/position";
import {Mountain} from "../src/domain/models/board-pieces/mountain";
import {CellType} from "../src/domain/models/cell-type";

describe('Game test', function () {
    let game = new Game();

    beforeEach(function () {
        game = new Game();
    });

    it('should play the game turn by turn with 2 adventurer, each adventurer play move by move and one by one', function () {
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

        expect(adventurer1.getPosition()).toEqual({
            _horizontalPosition: 0,
            _verticalPosition: 3
        });
        expect(adventurer2.getPosition()).toEqual({
            _horizontalPosition: 2,
            _verticalPosition: 3
        });
        expect(treasureMap.getCellType(adventurer1.getPosition())).toEqual(CellType.ADVENTURER_ON_TREASURE);
        expect(treasureMap.getCellType(adventurer2.getPosition())).toEqual(CellType.ADVENTURER);
        expect(adventurer1.treasureQuantity).toEqual(1);
        expect(adventurer2.treasureQuantity).toEqual(3);
        expect(treasureMap.treasures[0].quantity).toEqual(0);
        expect(treasureMap.treasures[1].quantity).toEqual(1);
    });
    it('should play the game and if adventurers go to the same case in next move, the first in file play first', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.SOUTH),
            movements: [Movement.FORWARD, Movement.FORWARD]
        });

        const adventurer2: Adventurer = new Adventurer({
            name: 'Indiana',
            position_x: 2,
            position_y: 3,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.LEFT, Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 4),
            mountains: [new Mountain(new Position(1, 0)), new Mountain(new Position(2, 1))],
            treasures: [new Treasure(new Position(0, 3), 2), new Treasure(new Position(1, 3), 3)],
            adventurers: [adventurer1, adventurer2]
        });

        expect(adventurer1.getPosition()).toEqual({
            _horizontalPosition: 1,
            _verticalPosition: 3
        });
        expect(adventurer2.getPosition()).toEqual({
            _horizontalPosition: 2,
            _verticalPosition: 3
        });
        expect(treasureMap.getCellType(adventurer1.getPosition())).toEqual(CellType.ADVENTURER_ON_TREASURE);
        expect(treasureMap.getCellType(adventurer2.getPosition())).toEqual(CellType.ADVENTURER);
        expect(adventurer1.treasureQuantity).toEqual(1);
        expect(adventurer2.treasureQuantity).toEqual(0);
        expect(treasureMap.treasures[1].quantity).toEqual(2);
    });
});
