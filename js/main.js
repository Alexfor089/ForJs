'use strict'

let money = +prompt('Вас месячный доход:', 30000);
console.log(money);
let income = 'Автомойка';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Интернет, продукты, жилье');
console.log(addExpenses);
let deposit = confirm('Есть ли у вас депозит в банке?', true);
console.log(deposit);
let mission = 100000;
let period = 12;
let month = 30;


//тип данных
console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));

//длина строки
console.log(addExpenses.length);

console.log('Период равен:' + ' ' +
 period + ' ' + 'месяцев.' + ' ' + 'Цель заработать:' + ' ' + mission + ' ' + 'рублей');
//Нижний регистор
console.log(addExpenses.toLowerCase());
//Разбитие строки на массив
console.log(addExpenses.split());
//Переменная с присваиванием бюджета

//Урок 3 




//Вызов 4-х переменных

let expenses1 = +prompt('Введите обязательную статью расходов');
let expenses2 = +prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

let sumExpenses = expenses1 + expenses2;
let budgetMonth = money - sumExpenses;
console.log('Ваш бюджет на месяц: ', +'' + budgetMonth);

let target = mission / budgetMonth;
console.log('Цель будет достигнута за:', Math.round(target, -1));
let budgetDay = budgetMonth / month;
console.log('Бюджет на день:', Math.floor(budgetDay, -1));

if (budgetDay >= 1200) {
 console.log('У вас высокий уровень дохода');
} else if ((budgetDay > 600) && (budgetDay < 1200)) {
 console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
 console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
 console.log('Вам срочно пора на работу!');
};