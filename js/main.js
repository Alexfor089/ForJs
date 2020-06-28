"use strict";

let startButton = document.getElementById("start"),
  cancelButton = document.getElementById("cancel"),
  incomeAddButton = document.getElementsByTagName("button")[0],
  expensesAddButton = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItems = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("result-total")[0],
  budjetDayValue = document.getElementsByClassName("result-total")[1],
  expensesMonthValue = document.getElementsByClassName("result-total")[2],
  additionalIncomeValue = document.getElementsByClassName("result-total")[3],
  additionalExpensesValue = document.getElementsByClassName("result-total")[4],
  incomePeriodValue = document.getElementsByClassName("result-total")[5],
  targetMonthValue = document.getElementsByClassName("result-total")[6],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeItems = document.querySelectorAll(".income-items"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budjet: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  start: function () {
    this.budjet = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudjet();
    appData.showResult();
    let inputBlock = document.querySelectorAll("input[type=text]");
    function blockInpText() {
      inputBlock.forEach(function (item) {
        if (!item.hasAttribute("disabled")) {
          item.setAttribute("disabled", "disabled");
        } else {
          item.removeAttribute("disabled");
        }
      });
      startButton.style.display = "none";
      cancelButton.style.display = "block";
    }
    blockInpText();
  },
  cancel: function () {
    this.start.reset();
    startButton.style.display = "block";
    cancelButton.style.display = "none";
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budjetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener("input", () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[expensesItems.length - 1].cloneNode(
      true
    );
    cloneExpensesItem.querySelectorAll("input")[0].value = "";
    appData.addListenersStr(
      cloneExpensesItem.querySelectorAll("input")[0]
    ); /*тут*/
    cloneExpensesItem.querySelectorAll("input")[1].value = "";
    appData.addListenersNum(
      cloneExpensesItem.querySelectorAll("input")[1]
    ); /*тут*/
    expensesItems[0].parentNode.insertBefore(
      cloneExpensesItem,
      expensesAddButton
    );
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesAddButton.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[incomeItems.length - 1].cloneNode(true);
    cloneIncomeItem.querySelectorAll("input")[0].value = "";
    appData.addListenersStr(cloneIncomeItem.querySelectorAll("input")[0]);
    cloneIncomeItem.querySelectorAll("input")[1].value = "";
    appData.addListenersNum(cloneIncomeItem.querySelectorAll("input")[1]);
    incomeItems[incomeItems.length - 1].parentNode.insertBefore(
      cloneIncomeItem,
      incomeAddButton
    );

    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeAddButton.style.display = "none";
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudjet: function () {
    this.budgetMonth = this.budjet + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / Math.floor(this.budgetMonth));
  },
  getStatusIncome: function () {
    if (this.budgetDay > 1200) {
      console.log("у вас высокий уровень дохода");
    } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
      console.log("У вас средний уровень дохода");
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      console.log("К сожалению, ваш уровень дохода - ниже среднего");
    } else {
      console.log("Что-то пошло не так");
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      /*тут*/
      do {
        this.percentDeposit = prompt("Каков годовой процент?", 10); /*тут*/
      } while (!isNumber(this.percentDeposit)); /*тут*/

      do {
        this.moneyDeposit = prompt("Какова сумма депозита", 10000); /*тут*/
      } while (!isNumber(this.moneyDeposit)); /*тут*/
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  liveChangePeriod: function () {
    periodAmount.textContent = periodSelect.value;
  },
  startButtonCheck: function () {
    startButton.disabled = salaryAmount.value.trim() === "";
  },
  addListenersNum: function (input) {
    input.addEventListener("input", function () {
      input.value = input.value.replace(/[^0-9]/g, "");
    });
  },
  addListenersStr: function (input) {
    input.addEventListener("input", function () {
      input.value = input.value.replace(/[^а-яА-Я, ]/g, "");
    });
  },
};

function func() {
  this.start;
}
let funcStart = func.bind(this);
funcStart();

startButton.addEventListener("click", appData.start);
cancelButton.addEventListener("click", appData.cancel);
expensesAddButton.addEventListener("click", appData.addExpensesBlock);
incomeAddButton.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.liveChangePeriod);
salaryAmount.addEventListener("input", appData.startButtonCheck);
appData.addListenersNum(document.querySelector(".income-amount"));
appData.addListenersNum(salaryAmount);
appData.addListenersNum(targetAmount);
appData.addListenersNum(document.querySelector(".expenses-amount"));
appData.addListenersStr(incomeItems[0].querySelector(".income-title"));
appData.addListenersStr(expensesItems[0].querySelector(".expenses-title"));
appData.addListenersStr(
  document.querySelectorAll(".additional_income-item")[0]
);
appData.addListenersStr(
  document.querySelectorAll(".additional_income-item")[1]
);
