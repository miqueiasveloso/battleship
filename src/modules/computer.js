import Player from '../modules/player';
import { generateRandomNumber, isEqualCoordinate } from '../modules/helpers';

const Computer = function Computer() {
  const plays = [];

  function checkForRepeatedPlay(newPlay) {
    return plays.some((prevPlay) => isEqualCoordinate(prevPlay, newPlay));
  }

  function addPlay(play) {
    plays.push(play);
  }

  function makePlay() {
    const play = { x: generateRandomNumber(9), y: generateRandomNumber(9) };
    const isRepeated = checkForRepeatedPlay(play);

    if (!isRepeated) {
      addPlay(play);
      return play;
    }

    return makePlay();
  }

  function getPlays() {
    return plays;
  }

  return { makePlay, getPlays, ...Player() };
};

export default Computer;