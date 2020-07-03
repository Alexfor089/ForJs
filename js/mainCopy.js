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

const AppData = function () {
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
};
AppData.prototype.start = function () {
  this.budjet = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudjet();

  this.showResult();

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
};
AppData.prototype.cancel = function () {
  let inputBlock = document.querySelectorAll("input[type=text]");
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

  salaryAmount.value = "";
  additionalExpensesItem.value = "";
  additionalIncomeItems[0].value = "";
  additionalIncomeItems[1].value = "";
  targetAmount.value = "";
  periodAmount.textContent = 1;
  periodSelect.value = 1;

  budgetMonthValue.value = "";
  budjetDayValue.value = "";
  expensesMonthValue.value = "";
  additionalIncomeValue.value = "";
  additionalExpensesValue.value = "";
  incomePeriodValue.value = "";
  targetMonthValue.value = "";
  this.budgetMonth = 0;

  startButton.style.display = "block";
  cancelButton.style.display = "none";
  start.setAttribute("disabled", "disabled");
};

AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budjetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();

  periodSelect.addEventListener("input", () => {
    incomePeriodValue.value = _this.calcSavedMoney();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[expensesItems.length - 1].cloneNode(
    true
  );
  cloneExpensesItem.querySelectorAll("input")[0].value = "";
  appData.addListenersStr(cloneExpensesItem.querySelectorAll("input")[0]);
  cloneExpensesItem.querySelectorAll("input")[1].value = "";
  appData.addListenersNum(cloneExpensesItem.querySelectorAll("input")[1]);
  expensesItems[0].parentNode.insertBefore(
    cloneExpensesItem,
    expensesAddButton
  );
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesAddButton.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[incomeItems.length - 1].cloneNode(true);
  cloneIncomeItem.querySelectorAll("input")[0].value = "";
  appData.addListenersStr(cloneIncomeItem.querySelectorAll("input")[0]);
  cloneIncomeItem.querySelectorAll("input")[1].value = "";
  appData.addListenersNum(cloneIncomeItem.querySelectorAll("input")[1]);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);

  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomeAddButton.style.display = "none";
  }
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItems.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getBudjet = function () {
  this.budgetMonth = this.budjet + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / Math.floor(this.budgetMonth));
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 1200) {
    console.log("у вас высокий уровень дохода");
  } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
    console.log("У вас средний уровень дохода");
  } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
    console.log("К сожалению, ваш уровень дохода - ниже среднего");
  } else {
    console.log("Что-то пошло не так");
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Каков годовой процент?", 10);
    } while (!isNumber(this.percentDeposit));

    do {
      this.moneyDeposit = prompt("Какова сумма депозита", 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.liveChangePeriod = function () {
  periodAmount.textContent = periodSelect.value;
};
AppData.prototype.startButtonCheck = function () {
  startButton.disabled = salaryAmount.value.trim() === "";
};
AppData.prototype.addListenersNum = function (input) {
  input.addEventListener("input", function () {
    input.value = input.value.replace(/[^0-9]/g, "");
  });
};
AppData.prototype.addListenersStr = function (input) {
  input.addEventListener("input", function () {
    input.value = input.value.replace(/[^а-яА-Я, ]/g, "");
  });
};
AppData.prototype.eventsListeners = function () {
  const _this = this;
  startButton.addEventListener("click", _this.start.bind(appData));
  cancelButton.addEventListener("click", _this.cancel);
  expensesAddButton.addEventListener("click", _this.addExpensesBlock);
  incomeAddButton.addEventListener("click", _this.addIncomeBlock);
  periodSelect.addEventListener("input", _this.liveChangePeriod);
  salaryAmount.addEventListener("input", _this.startButtonCheck);
  _this.addListenersNum(document.querySelector(".income-amount"));
  _this.addListenersNum(salaryAmount);
  _this.addListenersNum(targetAmount);
  _this.addListenersNum(document.querySelector(".expenses-amount"));
  _this.addListenersStr(incomeItems[0].querySelector(".income-title"));
  _this.addListenersStr(expensesItems[0].querySelector(".expenses-title"));
  _this.addListenersStr(
    document.querySelectorAll(".additional_income-item")[0]
  );
  _this.addListenersStr(
    document.querySelectorAll(".additional_income-item")[1]
  );
};

const appData = new AppData();
appData.eventsListeners();
