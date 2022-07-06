import Ship from '../modules/ship';
import { isEqualCoordinate, generateRandomNumber } from '../modules/helpers';

const GameBoard = function GameBoard() {
  let shipSizes = [5, 4, 3, 3, 2];
  let ships = [];
  let missedShots = [];

  function calculateCoordinates(shipLength, x, y, direction) {
    const coords = [];

    for (let i = 0; i < shipLength; i += 1) {
      if (direction === 'horizontal') {
        coords.push({ x: x + i, y });
      } else {
        coords.push({ x, y: y + i });
      }
    }

    return coords;
  }

  function checkCoordinatesAvailability(newCoordinates) {
    let available = true;

    for (let i = 0; i < ships.length; i += 1) {
      const shipCoordinates = ships[i].coordinates;

      const result = newCoordinates.filter((newShipCoordinate) =>
        shipCoordinates.some((oldShipCoordinate) =>
          isEqualCoordinate(newShipCoordinate, oldShipCoordinate)
        )
      );

      if (result.length) {
        available = false;
        break;
      }
    }

    return available;
  }

  function isWithinBounds(coordinates) {
    return coordinates.every((coordinate) => {
      const { x, y } = coordinate;
      return x >= 0 && x <= 9 && y >= 0 && y <= 9;
    });
  }

  function add(shipLength, x, y, direction) {
    const newCoordinates = calculateCoordinates(shipLength, x, y, direction);
    const isAvailable = checkCoordinatesAvailability(newCoordinates);
    const isInsideBoard = isWithinBounds(newCoordinates);

    if (isAvailable && isInsideBoard) {
      ships.push(Ship(shipLength, newCoordinates));
      return true;
    }

    return false;
  }

  function fill() {
    while (ships.length !== 5) {
      const x = generateRandomNumber(9);
      const y = generateRandomNumber(9);
      const direction =
        generateRandomNumber(1) === 0 ? 'horizontal' : 'vertical';
      const successful = add(shipSizes[0], x, y, direction);

      if (successful) {
        shipSizes.shift();
      }
    }
  }

  function getCoords(xAxis, yAxis) {
    let result = null;

    for (let i = 0; i < ships.length; i += 1) {
      const shipCoords = ships[i].coordinates.filter((ShipCoordinate) =>
        isEqualCoordinate(ShipCoordinate, { x: xAxis, y: yAxis })
      );

      if (shipCoords.length) {
        result = ships[i];
        break;
      }
    }

    return result;
  }

  function indexOfShipCoordinate(coordinate, array) {
    let index = -1;

    for (let i = 0; i < array.length; i += 1) {
      if (isEqualCoordinate(array[i], coordinate)) {
        index = i;
        break;
      }
    }

    return index;
  }

  function indexOfShip(ship) {
    return ships.indexOf(ship);
  }

  function removeShip(ship) {
    const index = indexOfShip(ship);
    ships.splice(index, 1);
  }

  function addMissedShot(coordinate) {
    missedShots.push(coordinate);
  }

  function receiveAttack(x, y) {
    const ship = getCoords(x, y);

    if (ship) {
      const shipCoordinates = ship.coordinates;
      const index = indexOfShipCoordinate({ x, y }, shipCoordinates);
      ship.hit(index);
      if (ship.isSunk()) removeShip(ship);
      return;
    }

    addMissedShot({ x, y });
  }

  function getMissedShots() {
    return missedShots;
  }

  function hasShips() {
    return ships.length > 0;
  }

  function getShips() {
    return ships;
  }

  function reset() {
    shipSizes = [5, 4, 3, 3, 2];
    ships = [];
    missedShots = [];
  }

  return {
    add,
    fill,
    getCoords,
    receiveAttack,
    getMissedShots,
    hasShips,
    getShips,
    reset,
  };
};

export default GameBoard;