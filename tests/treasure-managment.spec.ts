import {Game} from "../src/usecase/treasure-map-game/game";
import {Movement} from "../src/domain/models/movement";
import {Orientation, OrientationEnum} from "../src/domain/models/value-object/orientation";
import {MapDimensions} from "../src/domain/models/value-object/map-dimensions";
import {Treasure} from "../src/domain/models/board-pieces/treasure";
import {Position} from "../src/domain/models/value-object/position";
import {Adventurer} from "../src/domain/models/board-pieces/adventurer";
import {CellType} from "../src/domain/models/cell-type";

describe('Treasure managment', function () {
    let game: Game;

    beforeEach(function () {
        game = new Game();
    });

    it('Should pick up a treasure when the adventurer is on it', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(2, 2),
            mountains: [],
            treasures: [new Treasure(new Position(0, 0), 1)],
            adventurers: [adventurer1]
        });
        expect(adventurer1.getPosition()).toEqual(new Position(0, 0));
        expect(treasureMap.treasures[0].quantity).toEqual(0);
        expect(adventurer1.treasureQuantity).toEqual(1);
        expect(treasureMap.getCellType(adventurer1.getPosition())).toEqual(CellType.ADVENTURER_ON_TREASURE);
    });
    it('Should not pick up a treasure when the adventurer is not on it', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(2, 2),
            mountains: [],
            treasures: [new Treasure(new Position(0, 1), 1)],
            adventurers: [adventurer1]
        });
        expect(adventurer1.getPosition()).toEqual(new Position(0, 0));
        expect(treasureMap.treasures[0].quantity).toEqual(1);
    });
    it('Should pick up only one treasure when the adventurer is on it and there are multiple treasures', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD, Movement.RIGHT, Movement.RIGHT]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(2, 2),
            mountains: [],
            treasures: [new Treasure(new Position(0, 0), 2)],
            adventurers: [adventurer1]
        });

        expect(adventurer1.getPosition()).toEqual(new Position(0, 0));
        expect(treasureMap.treasures[0].quantity).toEqual(1);
        expect(adventurer1.treasureQuantity).toEqual(1);
        expect(treasureMap.getCellType(adventurer1.getPosition())).toEqual(CellType.ADVENTURER_ON_TREASURE);
    });
    it('Should not pick up a treasure if empty', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD]
        });
        const treasureMap = game.start({
            dimensions: new MapDimensions(2, 2),
            mountains: [],
            treasures: [new Treasure(new Position(0, 0), 0)],
            adventurers: [adventurer]
        });
        expect(adventurer.getPosition()).toEqual(new Position(0, 0));
        expect(treasureMap.treasures[0].quantity).toEqual(0);
        expect(adventurer.treasureQuantity).toEqual(0);
    });
});
