"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;

let start = function () {
  let sum1 = 0;
  do {
    money = +prompt("Ваш месячный доход:", 50000);
  } while (!isNumber(money)); {
    sum1 += money;
  }
  // console.log(money);
  return money;
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  month: 30,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы  через запятую:");
    appData.addExpenses = addExpenses.toLowerCase().split(',')
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let ask1, ask2;
      ask1 = prompt('Введите обязательную статью расходов?');
      do {
        ask2 = prompt('Во сколько это обойдется?');
      } while (!isNumber(ask2));
      appData.expenses[ask1] = ask2;

    }
    // for (let key in appData) {
    //   appData.expenses[ask1] = ask2
    //   console.log(appData.expenses);

    // }
  }

};
appData.asking();


//тип данных
//Урок 3
let expenses1,
  expenses2;
appData.getExpensesMonth = function () {
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
let expensesAmount = appData.getExpensesMonth();

appData.getBudget = function () {
  return money - expensesAmount;
}
appData.getBudget();
console.log(appData.getBudget());

let accumulatedMonth = appData.getBudget();

appData.getTargetMonth = function () {
  let getTarget = appData.mission / accumulatedMonth;
  if (getTarget < 0) {
    console.log("Цель не будет достигнута");
  } else {
    console.log("Цель  будет достигнута за: ", getTarget);
  }
  return getTarget;
}
appData.getTargetMonth();

let budgetDay = accumulatedMonth / appData.month;
console.log("Бюджет на день:", Math.floor(budgetDay, -1));

appData.getStatusIncome = function () {
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
console.log(appData.getStatusIncome());