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

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      let setint = setInterval(updateClock, 1000);
      if (timer.timeRamaining < 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    }

    updateClock();
  }
  if (timer.timeRamaining > 0) {
    setInterval(updateClock, 1000);
  }

  countTimer("14  july 2020");

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
      popupClose = document.querySelector(".popup-close");
    // popupCont = document.querySelector(".popup-content");

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.cssText = "opacity: 1; transition: 2s";
        popup.style.display = "block";
      });
    });
    popupClose.addEventListener("click", () => {
      popup.style.cssText = "opacity: 0";
      popup.style.display = "none";
    });
  };
  tooglePopUp();

  // animate

  // const animate = () => {
  //   let popupCont = document.querySelector(".popup-content"),
  //     popupBtn = document.querySelectorAll(".popup-btn"),
  //     count = 0;

  //   popupBtn.forEach((elem) => {
  //     elem.addEventListener("click", () => {
  //       count++;
  //       popupCont.style.top = count + "px";
  //       if (count < 400) {
  //         setTimeout(popupCont, 10);
  //       }
  //     });
  //   });
  // };
  // animate();
});
// let popupBtn = document.querySelectorAll(".popup-btn");
// let timeDuration = Date.now() - startDate;
// if (timeDuration > 3300) {
//   clearInterval(animate);
//   return;
// }
// startPos += 5;
// let to = field.clientHeight - ball.clientHeight;
// animate({
//   duration: 2000,
//   timing: makeEaseOut(bounce),
//   draw(progress) {
//     ball.style.top = to * progress + "px";
//   },
// });
// popupBtn.forEach((elem) => {
//   elem.addEventListener("click", () => {
//     document.querySelector(".popup-content").style.left =
//       timeDuration / 5 + "px";
//   });
// });
