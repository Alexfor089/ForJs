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

    const addZero = (num) => num < 10 ? '0' + num : num;

    const updateClock = () => {
      const timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);


      if (timer.timeRemaining < 0) {
        clearInterval(interval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();
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
  const tooggleMenuAnimate = () => {
    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;

    anchors.forEach(function (item) {
      item.addEventListener('click', function (e) {

        e.preventDefault();

        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;


        let scroller = setInterval(function () {
          let scrollBy = coordY / framesCount;

          if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            window.scrollBy(0, scrollBy);
          } else {
            window.scrollTo(0, coordY);
            clearInterval(scroller);
          }
        }, animationTime / framesCount);
      });
    });
  }
  tooggleMenuAnimate();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');
    popupBtns.forEach(item => item.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        popup.style.cssText = `
            opacity: 0;
            transition: all .4s;
            display: block;
            `;
        setTimeout(() => {
          popup.style.opacity = '1'
        }, 50);
      } else {
        popup.style.display = 'block';
      }
    }));
    popup.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        if (window.innerWidth > 768) {
          popup.style.cssText = `display: none;`;
          setTimeout(() => {
            popup.style.opacity = '1'
          }, 50);
        } else {
          popup.style.display = 'none';
        }
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    })
  };
  togglePopup();
  window.addEventListener('resize', togglePopup);
});