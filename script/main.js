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

      // function returnTime() {
      //   if (timeRamaining < 0) {
      //     timerHours.textContent = 00;
      //     timerMinutes.textContent = 00;
      //     timerSeconds.textContent = 00;
      //   }
      //   returnTime();
      // }
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      let setint = setInterval(updateClock, 1000);
      if (timer.timeRamaining > 0) {
        setInterval(updateClock, 1000);
      } else if (timer.timeRamaining < 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    }
    updateClock();
  }

  countTimer("12  july 2020");
  // setInterval(countTimer, 1000, '14 july 2020');
});
