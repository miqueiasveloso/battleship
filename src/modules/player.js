const Player = function Player() {
    let turn = false;
  
    function changeTurn() {
      turn = turn === false;
    }
  
    function isTurn() {
      return turn;
    }
  
    function resetTurn() {
      turn = false;
    }
  
    return {
      changeTurn,
      isTurn,
      resetTurn,
    };
  };
  
  export default Player;