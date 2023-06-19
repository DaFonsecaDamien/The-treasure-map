import {Adventurer} from "../src/domain/models/board-pieces/adventurer";
import {Orientation, OrientationEnum} from "../src/domain/models/value-object/orientation";
import {Movement} from "../src/domain/models/movement";
import {MapDimensions} from "../src/domain/models/value-object/map-dimensions";
import {Mountain} from "../src/domain/models/board-pieces/mountain";
import {Position} from "../src/domain/models/value-object/position";
import {Game} from "../src/usecase/treasure-map-game/game";
import {CellType} from "../src/domain/models/cell-type";

describe('Adventurer basic moves', function () {
    let game: Game;

    beforeEach(function () {
        game = new Game();
    });

    it('Should move the adventurer FOWARD when the orientation is NORTH', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(2, 2),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        });

        expect(adventurer.getPosition()).toEqual({
            _horizontalPosition: 1,
            _verticalPosition: 0
        });
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
        expect(treasureMap.getCellType(new Position(1, 1))).toEqual(CellType.PLAIN);
    });
    it('Should move the adventurer FOWARD when the orientation is SOUTH', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.SOUTH),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 3),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        });

        expect(adventurer.getPosition()).toEqual({
            _horizontalPosition: 1,
            _verticalPosition: 2
        });
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
        expect(treasureMap.getCellType(new Position(1, 1))).toEqual(CellType.PLAIN);
    });
    it('Should move the adventurer FOWARD when the orientation is EAST', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.EAST),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 3),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        });

        expect(adventurer.getPosition()).toEqual({
            _horizontalPosition: 2,
            _verticalPosition: 1
        });
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
        expect(treasureMap.getCellType(new Position(1, 1))).toEqual(CellType.PLAIN);
    });
    it('Should move the adventurer FOWARD when the orientation is WEST', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 3),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        });

        expect(adventurer.getPosition()).toEqual({
            _horizontalPosition: 0,
            _verticalPosition: 1
        });
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
        expect(treasureMap.getCellType(new Position(1, 1))).toEqual(CellType.PLAIN);
    });
    it('Should rotate the adventurer LEFT -> NORTH to WEST to SOUTH to EAST', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.LEFT, Movement.LEFT, Movement.LEFT]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 3),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        });
        expect(adventurer.orientation).toEqual(new Orientation(OrientationEnum.EAST));
        expect(adventurer.getPosition()).toEqual({
            _horizontalPosition: 1,
            _verticalPosition: 1
        });
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
    });
    it('Should rotate the adventure RIGHT -> NORTH to EAST to SOUTH to WEST', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.RIGHT, Movement.RIGHT, Movement.RIGHT]
        });

        const treasureMap = game.start({
            dimensions: new MapDimensions(3, 3),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        });

        expect(adventurer.orientation).toEqual(new Orientation(OrientationEnum.WEST));
        expect(adventurer.getPosition()).toEqual({
            _horizontalPosition: 1,
            _verticalPosition: 1
        });
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
    });
    it('Should not move the adventurer FORWARD, blocked by a mountain', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions : new MapDimensions(2, 2),
            mountains: [new Mountain(new Position(0,0))],
            treasures: [],
            adventurers: [adventurer]
        })
        expect(treasureMap.getCellType(new Position(0, 0))).toEqual(CellType.MOUNTAIN);
        expect(adventurer.getPosition()).toEqual(new Position(1, 0));
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
    });
    it('Should not move the adventurer FORWARD, blocked by another adventurer', function () {
        const adventurer1: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.WEST),
            movements: []
        });
        const adventurer2: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 1,
            orientation: new Orientation(OrientationEnum.NORTH),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions : new MapDimensions(2, 2),
            mountains: [],
            treasures: [],
            adventurers: [adventurer1, adventurer2]
        })
        expect(treasureMap.getCellType(adventurer1.getPosition())).toEqual(CellType.ADVENTURER);
        expect(adventurer2.getPosition()).toEqual(new Position(1, 1));
        expect(treasureMap.getCellType(adventurer2.getPosition())).toEqual(CellType.ADVENTURER);
    });
    it('Should not move the adventurer FORWARD, outside the map', function () {
        const adventurer: Adventurer = new Adventurer({
            name: 'Lara',
            position_x: 1,
            position_y: 0,
            orientation: new Orientation(OrientationEnum.EAST),
            movements: [Movement.FORWARD]
        });

        const treasureMap = game.start({
            dimensions : new MapDimensions(2, 2),
            mountains: [],
            treasures: [],
            adventurers: [adventurer]
        })

        expect(treasureMap.isPositionInsideMap(new Position(2,0))).toEqual(false);
        expect(adventurer.getPosition()).toEqual(new Position(1, 0));
        expect(treasureMap.getCellType(adventurer.getPosition())).toEqual(CellType.ADVENTURER);
        expect(treasureMap.isPositionInsideMap(adventurer.getPosition())).toEqual(true);
    });
});

