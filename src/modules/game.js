import Player from '../modules/player';
import Computer from '../modules/computer';
import GameBoard from '../modules/gameBoard';
import DOM from '../modules/dom';

const Game = (function Game() {
  const player = Player();
  const playerBoard = GameBoard();
  const computer = Computer();
  const computerBoard = GameBoard();
  let hasWinner = false;

  function addShips(gameBoard) {
    gameBoard.fill();
  }

  function setStartingPlayer(p) {
    p.changeTurn();
  }

  function nextTurn() {
    player.changeTurn();
    computer.changeTurn();
  }

  function resetTurns() {
    player.resetTurn();
    computer.resetTurn();
  }

  function computerPlay() {
    if (computer.isTurn() && !hasWinner) {
      const coords = computer.makePlay();
      const { x, y } = coords;
      const isShip = playerBoard.getCoords(x, y);
      playerBoard.receiveAttack(x, y);

      if (isShip) {
        DOM.setSuccessfulHit(DOM.getPlayerBoardSquare(x, y));
      } else {
        DOM.setMissedShot(DOM.getPlayerBoardSquare(x, y));
      }

      if (!playerBoard.hasShips()) {
        DOM.popUpResults('Computer');
        hasWinner = true;
      } else {
        nextTurn();
      }
    }
  }

  function playerPlay(event) {
    if (player.isTurn() && !hasWinner) {
      const coords = event.target.getAttribute('data-coordinate').split(',');
      const x = parseInt(coords[0], 10);
      const y = parseInt(coords[1], 10);

      const isShip = computerBoard.getCoords(x, y);
      computerBoard.receiveAttack(x, y);

      if (isShip) {
        DOM.setSuccessfulHit(event.target);
      } else {
        DOM.setMissedShot(event.target);
      }

      if (!computerBoard.hasShips()) {
        DOM.popUpResults('Player');
        hasWinner = true;
      } else {
        nextTurn();
        computerPlay();
      }
    }
  }

  function restartGame() {
    playerBoard.reset();
    computerBoard.reset();
    resetTurns();
    hasWinner = false;
    addShips(playerBoard);
    addShips(computerBoard);
    DOM.renderBoard(playerBoard, computerBoard);
    DOM.triggerPlayOnGameBoardClick(playerPlay);
    setStartingPlayer(player);
  }

  function start() {
    addShips(playerBoard);
    addShips(computerBoard);
    DOM.renderBoard(playerBoard, computerBoard);
    setStartingPlayer(player);
    DOM.triggerPlayOnGameBoardClick(playerPlay);
    DOM.triggerGameRestartOnResultsButtonClick(restartGame);
    DOM.triggerBoardPlay(restartGame);
  }

  return { start };
})();

export default Game;