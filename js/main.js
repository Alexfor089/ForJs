const money = 30000;
const income = 'Автомойка';
const addExpenses = 'Интернет, продукты, жилье';
const deposit = true;
const mission = 100000;
const period = 12;

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

const budgetDay = money;
console.log(budgetDay / 30);