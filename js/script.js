"use strict";
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;

// Все функции должны быть const, т.к. они неизменяемы!
const start = function () {
  do {
    money = prompt("Ваш месячный доход:", 50000);
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  month: 30,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      let itemIncome = prompt(
        "Какой у вас дополнительный заработок?",
        "Фриланс"
      );
      let cashIncome = prompt(
        "Сколько вы на этом зарабатываете в месяц?",
        15000
      );
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = prompt("Перечислите возможные расходы  через запятую:");
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    for (let i = 0; i < appData.addExpenses.length; i++) {
      let name = appData.addExpenses[i];
      name = name[0].toUpperCase() + name.substring(1);
      appData.addExpenses[i] = name;
    }
    console.log(appData.addExpenses);

    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let ask1, ask2;
      ask1 = prompt("Введите обязательную статью расходов?");
      do {
        ask2 = prompt("Во сколько это обойдется?");
      } while (!isNumber(ask2));
      appData.expenses[ask1] = ask2;
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      // пробегаем по свойству expenses по каждому ключу, например "Машина: 100000", "Еда: 50000"
      appData.expensesMonth += +appData.expenses[key]; // записываем стоимость ключа в свойство expensesMonth, 100000 + 50000
    }
    return appData.expensesMonth; // передаем данные из свойства expensesMonth дальше
  },

  getBudget: function () {
    // Доход за месяц, учитывая обязательные расходы
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    // дневной бюджет
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    return Math.floor(appData.budgetMonth);
  },

  getTargetMonth: function () {
    let getTarget = Math.ceil(appData.mission / appData.budgetMonth);
    if (getTarget < 0) {
      console.log("Цель не будет достигнута");
    } else {
      console.log("Цель  будет достигнута за: ", getTarget);
    }
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Вам срочно пора на работу!";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = +prompt("Какой годовой процент?", "10");
      appData.moneyDeposit = +prompt("Какая сумма заложена?", 15000);
    }
  },
  calcSaveMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();

let expensesAmount = appData.getExpensesMonth();
console.log("Расходы за месяц: ", expensesAmount);
let accumulatedMonth = appData.getBudget();
console.log("Уровень дохода: ", accumulatedMonth);
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSaveMoney();

for (let key in appData) {
  console.log(
    "Наша программа включает в себя данные " + key + " - " + appData[key]
  );
}
