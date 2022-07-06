const DOM = (function DOM() {
    const playerBoardContainer = document.querySelector('.player');
    const computerBoardContainer = document.querySelector('.computer');
    const results = document.querySelector('.results');
    const winner = document.getElementById('winner');
    const restart = document.getElementById('restart');
    const play = document.querySelector('.play');
  
    function createGameBoard(gameBoard) {
      const board = document.createElement('div');
      board.classList.add('gameboard');
  
      for (let x = 0; x <= 9; x += 1) {
        const column = document.createElement('div');
        column.classList.add('column');
  
        for (let y = 0; y <= 9; y += 1) {
          const square = document.createElement('div');
          square.classList.add('square');
          square.setAttribute('data-coordinate', `${x},${y}`);
          const isShip = gameBoard.getCoords(x, y);
          if (isShip) square.classList.add('ship');
          column.appendChild(square);
        }
  
        board.appendChild(column);
      }
  
      return board;
    }
  
    function removeExistingGameBoard(container) {
      const gameBoard = container.querySelector('.gameboard');
      if (gameBoard) container.removeChild(gameBoard);
    }
  
    function renderBoard(player, computer) {
      removeExistingGameBoard(playerBoardContainer);
      removeExistingGameBoard(computerBoardContainer);
      const playerBoard = createGameBoard(player);
      const computerBoard = createGameBoard(computer);
      playerBoardContainer.appendChild(playerBoard);
      computerBoardContainer.appendChild(computerBoard);
    }
  
    function triggerPlayOnGameBoardClick(fn) {
      computerBoardContainer
        .querySelectorAll('.square')
        .forEach((square) =>
          square.addEventListener('click', fn, { once: true })
        );
    }
  
    function getPlayerBoardSquare(x, y) {
      let result;
      const squares = playerBoardContainer.querySelectorAll('.square');
  
      for (let i = 0; i < squares.length; i += 1) {
        const coords = squares[i].getAttribute('data-coordinate').split(',');
        const squareX = parseInt(coords[0], 10);
        const squareY = parseInt(coords[1], 10);
        if (x === squareX && y === squareY) {
          result = squares[i];
          break;
        }
      }
  
      return result;
    }
  
    function setSuccessfulHit(target) {
      target.classList.add('ship-hit');
    }
  
    function setMissedShot(target) {
      target.classList.add('missed-shot');
    }
  
    function toggleResults() {
      results.classList.toggle('active');
    }
  
    function setWinner(text) {
      winner.textContent = `${text} won!`;
    }
  
    function popUpResults(text) {
      toggleResults();
      setWinner(text);
    }
  
    function closeResults() {
      results.classList.remove('active');
    }
  
    function triggerGameRestartOnResultsButtonClick(fn) {
      restart.addEventListener('click', (e) => {
        fn(e);
        closeResults();
      });
    }
  
    function triggerBoardPlay(fn) {
      play.addEventListener('click', fn);
    }
  
    return {
      renderBoard,
      triggerPlayOnGameBoardClick,
      getPlayerBoardSquare,
      setSuccessfulHit,
      setMissedShot,
      popUpResults,
      triggerGameRestartOnResultsButtonClick,
      triggerBoardPlay,
    };
  })();
  
  export default DOM;