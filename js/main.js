"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;

let start = function () {
  let sum1 = 0;
  do {
    money = +prompt("Ваш месячный доход:");
  } while (!isNumber(money));
  {
    sum1 += money;
  }
  // console.log(money);
  return money;
};

start();

let income = "Автомойка",
  addExpenses = prompt("Перечислите возможные расходы  через запятую:"),
  deposit = confirm("Есть ли у вас депозит в банке?", true),
  mission = 100000,
  period = 12,
  month = 30;

//тип данных
let showTypeOf = function (data) {
  console.log(data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//Разбитие строки на массив
console.log(addExpenses.split());
//Переменная с присваиванием бюджета

//Урок 3

//Вызов 4-х переменных

let expenses1, expenses2;

let getExpensesMonth = function () {
  let sum = 0;
  let amount = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses1 = prompt("Введите обязательную статью расходов");
    } else if (i === 1) {
      expenses2 = prompt("Введите обязательную статью расходов");
    }

    do {
      amount = +prompt("Во сколько это обойдется?");
    } while (!isNumber(amount));
    sum += amount;
    console.log(sum);
  }
  return sum;
};
let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
}
getAccumulatedMonth();
console.log(getAccumulatedMonth());

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  let getTarget = mission / accumulatedMonth;
  if (getTarget < 0) {
    console.log("Цель не будет достигнута");
  } else {
    console.log("Цель  будет достигнута за: ", getTarget);
  }
  return getTarget;
}
getTargetMonth();

let budgetDay = accumulatedMonth / month;
console.log("Бюджет на день:", Math.floor(budgetDay, -1));

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (budgetDay < 0) {
    return "Вам срочно пора на работу!";
  }
};
console.log(getStatusIncome());
