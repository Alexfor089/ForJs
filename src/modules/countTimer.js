const countTimer = (deadline) => {
   let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

   function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
         dateNow = new Date().getTime(),
         timeRemaining = (dateStop - dateNow) / 1000,
         seconds = Math.floor(timeRemaining % 60),
         minutes = Math.floor((timeRemaining / 60) % 60),
         hours = Math.floor(timeRemaining / 60 / 60);
      return {
         timeRemaining,
         hours,
         minutes,
         seconds,
      };
   }

   const addZero = (num) => (num < 10 ? "0" + num : num);

   const updateClock = () => {
      const timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining < 0) {
         clearInterval(interval);
         timerHours.textContent = "00";
         timerMinutes.textContent = "00";
         timerSeconds.textContent = "00";
      }
   };

   const interval = setInterval(updateClock, 1000);
   updateClock();
};

export default countTimer;