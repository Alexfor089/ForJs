window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRamaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRamaining % 60),
        minutes = Math.floor((timeRamaining / 60) % 60),
        hours = Math.floor(timeRamaining / 60 / 60);
      return {
        timeRamaining,
        hours,
        minutes,
        seconds,
      };
    }

    const updateClock = () => {
      const addZero = (num) => {
        if (num <= 9) {
          num = '0' + num;
          return num;
        }
      }
      addZero();
      const timer = getTimeRemaining();
      addZero(timer.hours, timerHours);
      addZero(timer.minutes, timerMinutes);
      addZero(timer.seconds, timerSeconds);

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(interval);
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
  };


  countTimer("15  july 2020");

  // menu

  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };
    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener("click", handlerMenu));
  };

  toggleMenu();

  //popup

  const tooglePopUp = () => {
    let popup = document.querySelector(".popup");
    popup.style.cssText = "opacity: 0;";
    let popupBtn = document.querySelectorAll(".popup-btn"),
      popupClose = document.querySelector(".popup-close"),
      popupCont = document.querySelector(".popup-content");
    //
    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
        popup.style.cssText = "transition: 1.1s ease-out";
        popup.style.cssText = "transform: scale(1)";
        popup.style.cssText = "opacity: 1";
        popup.style.cssText = "visibility: visible";
      });
    });
    popupClose.addEventListener("click", () => {
      popup.style.cssText = "opacity: 0";
      popup.style.cssText = "visibility: hidden";
      popup.style.display = "none";
    });
  };
  tooglePopUp();
});