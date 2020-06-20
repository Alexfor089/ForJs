'use srtict'


let calc = document.getElementById('#start');
let plusIncome = document.getElementsByTagName('button')[0];
let plusExpenses = document.getElementsByTagName('button')[1];
let depositСheck = document.querySelector('#deposit-check');
let possibleIncome = document.querySelectorAll('additional_expenses-item');
let budgetDay = document.getElementsByClassName('result-total')[1];
let expensesMonth = document.getElementsByClassName('result-total')[2];
let additionalIncome = document.getElementsByClassName('result-total')[3];
let incomePeriod = document.getElementsByClassName('result-total')[4];
let targetMonth = document.getElementsByClassName('result-total')[5];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let additionalIncomeInput = document.querySelector('.additional_income-item');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');