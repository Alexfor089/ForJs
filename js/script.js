"use strict";

let isNum = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const gameStart = function () {
  const randomNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  let count = 10;
  alert("Угадайте число от 1 до 100!");
  return function gamePlay() {
    let num = prompt("Угадайте число");
    if (isNum(num)) {
      let useNumber = +num;
      count--;
      if (count >= 0) {
        if (useNumber < randomNum) {
          confirm("Загаданное число больше,осталось попыток:" + count);
          return gamePlay();
        } else if (useNumber > randomNum) {
          confirm("Загаданное число меньше,осталось попыток:" + count);
          return gamePlay();
        } else {
          if (confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?")) {
            gameStart()();
          } else {
            alert("Вы завершили игру");
          }
        }
      } else {
        if (confirm("Попытки закончились, хотите сыграть еще?")) {
          gameStart()();
        } else {
          alert("Вы завершили игру");
        }
      }
    } else if (num === null && num === false) {
      alert("Вы завершили игру");
    } else {
      return gamePlay();
    }
  };
};
const startGame = gameStart();
startGame();
