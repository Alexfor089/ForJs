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

    const btnMenu = document.querySelector('.menu'),
      closeBtn = document.querySelector('.close-btn'),
      menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul>li>a');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    document.addEventListener('click', event => {
      let target = event.target;
      if (target.closest('.menu') || target.classList.contains('close-btn') || (target.closest('menu') && target.tagName === 'A')) handlerMenu();
      if ((menu.classList.contains('active-menu') && target !== target.closest('menu')) && !target.closest('.menu') && target.tagName !== 'LI') handlerMenu();
    });
  };
  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn');
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
    });
    window.addEventListener('resize', togglePopup);
  };
  togglePopup();

  //Tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tabs = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      tabContent.forEach((item, i) => {
        if (i === index) {
          tabs[i].classList.add('active');
          item.classList.remove('d-none');
        } else {
          tabs[i].classList.remove('active');
          item.classList.add('d-none');
        }
      });
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target.classList.contains('service-header-tab')) {
        tabs.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //slider

  const sliderFoo = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
      buttons = document.querySelectorAll('.portfolio-btn'),
      dotsWrapper = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval, dots;

    const addDots = () => {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dotsWrapper.append(dot);
      }
      dots = document.querySelectorAll('.dot');
      dots[0].classList.add('dot-active');
    };
    addDots();

    const prevSlide = (elem, index, strClass) => elem[index].classList.remove(strClass);
    const nextSlide = (elem, index, strClass) => elem[index].classList.add(strClass);

    const autoPlayslide = () => {
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3500) => interval = setInterval(autoPlayslide, time);
    const stopSlide = () => clearInterval(interval);

    startSlide(3500);

    slider.addEventListener('click', event => {
      event.preventDefault();
      let target = event.target;

      if (target.matches('.portfolio-btn, .dot')) {
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) currentSlide++;
        else if (target.matches('#arrow-left')) currentSlide--;
        else if (target.matches('.dot'))
          dots.forEach((item, index) => currentSlide = (target === item) ? index : currentSlide);

        currentSlide = (currentSlide >= slides.length) ? 0 : (currentSlide < 0) ? slides.length - 1 : currentSlide;

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
      }
    });
    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) stopSlide();
    });
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) startSlide();
    });
  };
  sliderFoo();

});