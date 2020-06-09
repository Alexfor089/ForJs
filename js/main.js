"use strict";

let money = +prompt("Вас месячный доход:", 30000);
let income = "Автомойка";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую:",
  "Интернет, продукты, жилье"
);
// console.log(addExpenses);
let deposit = confirm("Есть ли у вас депозит в банке?", true);
let mission = 100000;
let period = 12;
let month = 30;

//тип данных
let showTypeOf = function (data) {
  console.log(data, typeof (data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//длина строки
// console.log(addExpenses.length);

// console.log(
//   "Период равен:" +
//   " " +
//   period +
//   " " +
//   "месяцев." +
//   " " +
//   "Цель заработать:" +
//   " " +
//   mission +
//   " " +
//   "рублей"
// );
//Нижний регистор
// console.log(addExpenses.toLowerCase());
//Разбитие строки на массив
console.log(addExpenses.split());
//Переменная с присваиванием бюджета

//Урок 3

//Вызов 4-х переменных


let expenses1 = prompt("Введите обязательную статью расходов");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов");
let amount2 = +prompt("Во сколько это обойдется?");

let sumExpenses = amount1 + amount2;
// let budgetMonth = money - sumExpenses;
// console.log("Ваш бюджет на месяц: ", +"" + accumulatedMonth);

// let target = mission / accumulatedMonth;
// console.log("Цель будет достигнута за:", Math.round(target, -1));
let budgetDay = accumulatedMonth / month;
console.log("Бюджет на день:", Math.floor(budgetDay, -1));

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ("У вас высокий уровень дохода");
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return ("У вас средний уровень дохода");
  } else if (budgetDay < 600) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    return ("Вам срочно пора на работу!");
  }
};
console.log(getStatusIncome());


//Урок 4sumExpenses

function getExpensesMonth() {
  return amount1 + amount2;
}
getExpensesMonth();
console.log(getExpensesMonth());


function getAccumulatedMonth() {
  return money - (amount1 + amount2);
}
getAccumulatedMonth();
console.log(getAccumulatedMonth());

function getTargetMonth() {
  let getTarget = mission / accumulatedMonth;
  return getTarget;
}
getTargetMonth();
let accumulatedMonth = console.log(getAccumulatedMonth());

console.log(getTargetMonth());