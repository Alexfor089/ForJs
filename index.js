'use strict';

const startButton = document.getElementById('start'),
    resetButton = document.getElementById('cancel'),
    incomeAddButton = document.getElementsByTagName('button')[0],
    expensesAddButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total')[0],
    budjetDayValue = document.getElementsByClassName('result-total')[1],
    expensesMonthValue = document.getElementsByClassName('result-total')[2],
    additionalIncomeValue = document.getElementsByClassName('result-total')[3],
    additionalExpensesValue = document.getElementsByClassName('result-total')[4],
    incomePeriodValue = document.getElementsByClassName('result-total')[5],
    targetMonthValue = document.getElementsByClassName('result-total')[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//Создание класса со свойствами 

class AppData {
    constructor() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budjet = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }

    //методы
    start() {
        this.budjet = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudjet();
        this.showResult();
        salaryAmount.disabled = true;
        let inputs = document.querySelectorAll('input');
        inputs.forEach(item => {
            item.disabled = true;
        });
        periodSelect.disabled = false;
        startButton.style = 'display: none;';
        resetButton.style = 'display: block';
    }

    reset() {
        const inputBlock = document.querySelectorAll('input');
        inputBlock.forEach(function (elem) {
            elem.value = "";
        });

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomeAddButton.style.display = "block";
        }

        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesAddButton.style.display = "block";
        }

        inputBlock.forEach(function (item) {
            if (!item.hasAttribute("disabled")) {
                item.setAttribute("disabled", "disabled");
            } else {
                item.removeAttribute("disabled");
            }
        });
        periodAmount.textContent = '1';
        Object.assign(this, new AppData()); // сбрас свойств к 0
        periodSelect.value = 1;
        budgetMonthValue.disabled = true;
        budjetDayValue.disabled = true;
        expensesMonthValue.disabled = true;
        additionalIncomeValue.disabled = true;
        additionalExpensesValue.disabled = true;
        incomePeriodValue.disabled = true;
        targetMonthValue.disabled = true;


        startButton.style = 'display: block;';
        resetButton.style = 'display: none';
        startButton.disabled = true;


        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);



        depositPercent.style.display = 'none';



    }

    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budjetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = _this.calcSavedMoney();
        });
    }

    addBlock(event) {
        const str = event.target.className.split(' ')[1].split('_')[0];
        let cloneItem;
        switch (str) {
            case 'expenses':
                cloneItem = expensesItems[expensesItems.length - 1].cloneNode(true);
                cloneItem.querySelectorAll("input")[0].value = "";
                appData.addListenersStr(cloneItem.querySelectorAll("input")[0]);
                cloneItem.querySelectorAll("input")[1].value = "";
                appData.addListenersNum(cloneItem.querySelectorAll("input")[1]);
                expensesItems[0].parentNode.insertBefore(
                    cloneItem,
                    expensesAddButton
                );
                expensesItems = document.querySelectorAll('.expenses-items');
                if (expensesItems.length === 3) {
                    expensesAddButton.style.display = 'none';
                }
                break;
            case 'income':
                cloneItem = incomeItems[incomeItems.length - 1].cloneNode(true);
                cloneItem.querySelectorAll('input')[0].value = '';
                appData.addListenersStr(cloneItem.querySelectorAll("input")[0]);
                cloneItem.querySelectorAll("input")[1].value = "";
                appData.addListenersNum(cloneItem.querySelectorAll("input")[1]);
                incomeItems[0].parentNode.insertBefore(cloneItem, incomeAddButton);

                incomeItems = document.querySelectorAll('.income-items');
                if (incomeItems.length === 3) {
                    incomeAddButton.style.display = 'none';
                }
                break;
        }

    }

    getExpInc() {
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

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpInc() {
        const addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });

        additionalIncomeItems.forEach(function (item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudjet() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budjet + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / Math.floor(this.budgetMonth));
    }

    getStatusIncome() {
        if (this.budgetDay > 1200) {
            console.log('у вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            console.log('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            console.log('К сожалению, ваш уровень дохода - ниже среднего');
        } else {
            console.log('Что-то пошло не так');
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;

        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    liveChangePeriod() {
        periodAmount.textContent = periodSelect.value;
    }

    startButtonCheck() {
        startButton.disabled = salaryAmount.value.trim() === '';
    }

    addListenersNum(input) {
        input.addEventListener('input', function () {
            input.value = input.value.replace(/[^0-9]/g, '');
        });
    }

    addListenersStr(input) {
        input.addEventListener('input', function () {
            input.value = input.value.replace(/[^а-яА-Я, ]/g, '');
        });
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }

    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {
        startButton.addEventListener('click', this.start.bind(this));
        resetButton.addEventListener('click', this.reset);
        expensesAddButton.addEventListener('click', this.addBlock);
        incomeAddButton.addEventListener('click', this.addBlock);
        periodSelect.addEventListener('input', this.liveChangePeriod);
        salaryAmount.addEventListener('input', this.startButtonCheck);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input', () => {
            depositPercent.value = (depositPercent.value < 0) ? 0 :
                (depositPercent.value > 100) ? 100 : depositPercent.value;
        });
        this.addListenersNum(document.querySelector('.income-amount'));
        this.addListenersNum(salaryAmount);
        this.addListenersNum(targetAmount);
        this.addListenersNum(depositPercent);
        this.addListenersNum(document.querySelector('.expenses-amount'));
        this.addListenersStr(incomeItems[0].querySelector('.income-title'));
        this.addListenersStr(expensesItems[0].querySelector('.expenses-title'));
        this.addListenersStr(document.querySelectorAll('.additional_income-item')[0]);
        this.addListenersStr(document.querySelectorAll('.additional_income-item')[1]);
    }

}


const appData = new AppData();
appData.eventListeners();