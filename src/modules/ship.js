const Ship = function Ship(size, coords) {
    const length = size;
    const hitPositions = new Array(length).fill(false);
    const coordinates = coords;
  
    function hit(position) {
      const inRange = position >= 0 && position < length;
      if (inRange) hitPositions[position] = true;
    }
  
    function isSunk() {
      return hitPositions.every((position) => position === true);
    }
  
    return {
      length,
      hitPositions,
      coordinates,
      hit,
      isSunk,
    };
  };
  
  export default Ship;