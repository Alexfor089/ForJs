"use strict";
alert("Загадывание случайного числа от 1 до 100");

let num = Number;

function gameBot() {
  let answer = +prompt("Угадай число от 1 до 100: ");
  let str = String;
  console.log(answer);

  function getNumber() {
    if (answer === num) {
      answer = +prompt("Угадай число от 1 до 100: ");
    } else if (answer === false) {
      alert('Игра закончена!');
    } else if (answer > 100) {
      confirm("Загаданное число больше!Введите еще раз");
      prompt("Угадай число от 1 до 100: ");
    } else if (answer < 100) {
      confirm("Загаданное число меньше!Введите еще раз");
      prompt("Угадай число от 1 до 100: ");
    } else if (answer === str) {
      confirm("Вы ввели не число"); +
      prompt("Введите число");
    } else {
      confirm("Вы угадали число)");
    }
  }
  getNumber();
  console.log(answer);
  return answer;
}
gameBot();