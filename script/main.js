'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel');

const incomePlusBtn = document.getElementsByTagName('button')[0],
    expensesPlusBtn = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    additionalAxpensesItem = document.querySelector('.additional_expenses-item'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    period = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    salaryAmount = document.querySelector('.salary-amount'),
    allInputs = document.querySelectorAll('.data input[type= "text"]');


class AppData {
    constructor() {
        this.budget = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.deposit = false;
        this.percentDetosit = 0;
        this.moneyDeposit = 0;
        this.expenses = {};
        this.expensesMonth = 0;
        this.period = 0;
        this.income = {};
        this.incomeMonth = 0;
    }
    start() {
        this.budget = +salaryAmount.value;
        console.log('бюджет', this.budget);
        this.getIncExp();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }
}

AppData.prototype.helpers = {
    isNumber: (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isEmpty: (s) => {
        if (s === '') {
            return true;
        } else {
            return false;
        }
    },
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    test: () => {
        console.log('Hello');
    },
    validation: () => {
        allInputs = document.querySelectorAll('.data input[type= "text"]');
        allInputs.forEach((item) => {
            if (item.placeholder === 'Сумма') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/\D/, '');
                });
            } else if (item.placeholder === 'Наименование') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^?!,.а-яА-ЯёЁ\s\-]+$/, '');
                });
            }
        });
    }
};