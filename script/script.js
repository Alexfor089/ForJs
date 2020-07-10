'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel');

const incomePlusBtn = document.getElementsByTagName('button')[0],
    expensesPlusBtn = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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

        this.getIncExp();
        this.getExpensesMonth();
        this.getAddIncEpx();
        this.getBudget();
        this.showResult();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    addIncExpBlock(button, items) {
        const addItem = (item) => {
            const cloneItem = item[0].cloneNode(true);
            const start = item[0].className.split('-')[0];
            cloneItem.querySelector(`.${start}-title`).value = null;
            cloneItem.querySelector(`.${start}-amount`).value = null;
            item[item.length - 1].after(cloneItem);
            item = document.querySelectorAll(`.${start}-items`);
            if (start === 'income') {
                incomeItems = document.querySelectorAll(`.${start}-items`);
            } else if (start === 'expenses') {
                expensesItems = document.querySelectorAll(`.${start}-items`);
            }
            if (item.length === 3) {
                button.style.display = 'none';
            }
            this.validation();
        };
        addItem(items);
    }

    getIncExp() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        incomeItems.forEach(count);
        expensesItems.forEach(count);
        for (let k in this.income) {
            this.incomeMonth += +this.income[k];
        }
    }

    getAddIncEpx() {
        let additionalExpenses = additionalExpensesItem.value.split(',');

        const add = (item, val, type) => {
            item.forEach((i) => {
                if (type === 'expenses') {
                    i = i.trim();
                } else if (type === 'income') {
                    i = i.value.trim();
                }
                if (i !== '') {
                    val.push(i);
                }
            });
        };
        add(additionalExpenses, this.addExpenses, 'expenses');
        add(additionalIncomeItem, this.addIncome, 'income');
    }

    getExpensesMonth() { //вычасляет сумму всех обязательных расходов
        for (let n in this.expenses) {
            this.expensesMonth += +this.expenses[n];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDetosit = prompt('Какой процент', '10');
            } while (!this.helpers.isNumber(this.percentDetosit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена', 10000);
            } while (!this.helpers.isNumber(this.moneyDeposit));

        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    getPeriod() {
        period.textContent = periodSelect.value;
        this.period = periodSelect.value;
    }

    resetObj() {
        Object.assign(this, new AppData());
    }

    reset() {
        this.resetObj();
        const allInput = document.querySelectorAll('input');
        allInput.forEach((item) => {
            if (item.type === 'range') {
                item.value = '1';
                this.getPeriod();
            } else {
                item.value = '';
            }
            start.disabled = true;
        });
        const incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item, index) => {
            if (index !== 0) {
                item.remove();
            }
            incomePlusBtn.style.display = 'block';
        });
        expensesItems.forEach((item, index) => {
            if (index !== 0) {
                item.remove();
            }
            expensesItems = document.querySelectorAll('.expenses-items');
            expensesPlusBtn.style.display = 'block';
        });
    }

    initApp() {
        this.validation();
        start.disabled = true;
        start.addEventListener('click', () => {
            this.start();
            start.style.display = 'none';
            cancel.style.display = 'block';
            incomePlusBtn.disabled = true;
            expensesPlusBtn.disabled = true;
            allInputs.forEach((item) => {
                item.disabled = true;
            });
        });
        cancel.addEventListener('click', () => {
            this.reset();
            start.style.display = 'block';
            cancel.style.display = 'none';
            incomePlusBtn.disabled = false;
            expensesPlusBtn.disabled = false;
            allInputs.forEach((item) => {
                item.disabled = false;
            });
        });

        incomePlusBtn.addEventListener('click', () => {
            this.addIncExpBlock(incomePlusBtn, incomeItems);
        });
        expensesPlusBtn.addEventListener('click', () => {
            this.addIncExpBlock(expensesPlusBtn, expensesItems);
        });

        periodSelect.addEventListener('input', this.getPeriod);

        start.disabled = true;
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '') {
                start.disabled = false;
            }
        });
    }
    validation() {
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
}
const appData = new AppData();

appData.initApp();