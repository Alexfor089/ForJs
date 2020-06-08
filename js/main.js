let money = 30000;
let income = 'Автомойка';
let addExpenses = 'Интернет, продукты, жилье';
let deposit = true;
let mission = 100000;
let period = 12;
let month = 30;
//Переменные урока № 3



//Урок 3 

//Спрашиваем у пользователся данные и сохраняем в переменные


money = +prompt('Вас месячный доход:');
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:')
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);
//Вызов 4-х переменных
let expenses1 = +prompt('Введите обязательную статью расходов');
let expenses2 = +prompt('Введите обязательную статью расходов');
// let amount1 = +prompt('Во сколько это обойдется?');
// let amount2 = +prompt('Во сколько это обойдется?');

let sumExpenses = expenses1 + expenses2;
let budgetMonth = money - sumExpenses;
console.log('Ваш бюджет на месяц: ', +'' + budgetMonth);

let target = mission / budgetMonth;
console.log('Цель будет достигнута за:', Math.round(target, -1));
let budgetDay = budgetMonth / month;
console.log('Бюджет на день:', Math.floor(budgetDay, -1));

if (budgetDay >= 1200) {
 confirm('У вас высокий уровень дохода');
} else if ((budgetDay > 600) && (budgetDay < 1200)) {
 confirm('У вас средний уровень дохода');
} else if (budgetDay < 600) {
 confirm('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
 confirm('Вам срочно пора на работу!');
} else if (Math.sing(-budgetDay)) {
 confirm('Что то пошло не так');
};