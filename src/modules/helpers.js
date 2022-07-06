export function generateRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  
  export function isEqualCoordinate(coordinate1, coordinate2) {
    return coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y;
  }