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
  }

  countTimer("21  july 2020");

  // menu

  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      closeBtn = document.querySelector(".close-btn"),
      menu = document.querySelector("menu"),
      menuItems = menu.querySelectorAll("ul>li>a");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };
    document.addEventListener("click", (event) => {
      let target = event.target;
      if (
        target.closest(".menu") ||
        target.classList.contains("close-btn") ||
        (target.closest("menu") && target.tagName === "A")
      )
        handlerMenu();
      if (
        menu.classList.contains("active-menu") &&
        target !== target.closest("menu") &&
        !target.closest(".menu") &&
        target.tagName !== "LI"
      )
        handlerMenu();
    });
  };
  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtns = document.querySelectorAll(".popup-btn");
    popupBtns.forEach((item) =>
      item.addEventListener("click", () => {
        if (window.innerWidth > 768) {
          popup.style.cssText = `
            opacity: 0;
            transition: all .4s;
            display: block;
            `;
          setTimeout(() => {
            popup.style.opacity = "1";
          }, 50);
        } else {
          popup.style.display = "block";
        }
      })
    );
    popup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        if (window.innerWidth > 768) {
          popup.style.cssText = `display: none;`;
          setTimeout(() => {
            popup.style.opacity = "1";
          }, 50);
        } else {
          popup.style.display = "none";
        }
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "none";
        }
      }
    });
    window.addEventListener("resize", togglePopup);
  };
  togglePopup();

  //Tabs

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tabs = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      tabContent.forEach((item, i) => {
        if (i === index) {
          tabs[i].classList.add("active");
          item.classList.remove("d-none");
        } else {
          tabs[i].classList.remove("active");
          item.classList.add("d-none");
        }
      });
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target.classList.contains("service-header-tab")) {
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
    const slides = document.querySelectorAll(".portfolio-item"),
      buttons = document.querySelectorAll(".portfolio-btn"),
      dotsWrapper = document.querySelector(".portfolio-dots"),
      slider = document.querySelector(".portfolio-content");

    let currentSlide = 0,
      interval,
      dots;
    //добавление точек/(дотсов)
    const addDots = () => {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dotsWrapper.append(dot);
      }
      dots = document.querySelectorAll(".dot");
      dots[0].classList.add("dot-active");
    };
    addDots();

    const prevSlide = (elem, index, strClass) =>
      elem[index].classList.remove(strClass);
    const nextSlide = (elem, index, strClass) =>
      elem[index].classList.add(strClass);

    const autoPlayslide = () => {
      prevSlide(slides, currentSlide, "portfolio-item-active");
      prevSlide(dots, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      nextSlide(slides, currentSlide, "portfolio-item-active");
      nextSlide(dots, currentSlide, "dot-active");
    };

    const startSlide = (time = 3500) =>
      (interval = setInterval(autoPlayslide, time));
    const stopSlide = () => clearInterval(interval);

    startSlide(3500);

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;

      if (target.matches(".portfolio-btn, .dot")) {
        prevSlide(slides, currentSlide, "portfolio-item-active");
        prevSlide(dots, currentSlide, "dot-active");

        if (target.matches("#arrow-right")) currentSlide++;
        else if (target.matches("#arrow-left")) currentSlide--;
        else if (target.matches(".dot"))
          dots.forEach(
            (item, index) =>
              (currentSlide = target === item ? index : currentSlide)
          );
        //если кол - во фото больше числа - то возращается к 1 (0)
        currentSlide =
          currentSlide >= slides.length
            ? 0
            : currentSlide < 0
            ? slides.length - 1
            : currentSlide;

        nextSlide(slides, currentSlide, "portfolio-item-active");
        nextSlide(dots, currentSlide, "dot-active");
      }
    });
    //события
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      )
        stopSlide();
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      )
        startSlide();
    });
  };
  sliderFoo();

  //Ззменеие фотографий по наведению в блоке "Наша команда" на другие из data-img

  const changePhoto = () => {
    const photos = document.querySelectorAll(".command__photo");

    const changePhoto = (e) => {
      const src = e.target.src;
      e.target.src = e.target.dataset.img;
      e.target.dataset.img = src;
    };

    photos.forEach((item) => {
      item.addEventListener("mouseenter", changePhoto);
      item.addEventListener("mouseleave", changePhoto);
    });
  };
  changePhoto();

  //Калькулятор

  //Блокировка ввода - если не цифры

  const calculate = (price = 100) => {
    const calcInputs = document.querySelectorAll("input.calc-item");
    calcInputs.forEach((item) => {
      item.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[\D]/g, "");
      });
    });

    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalValue = document.getElementById("total");
    // функция подсчета
    const countSum = () => {
      let total = 0,
        dayValue = 1,
        countValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      if (calcDay.value && calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      // totalValue
      totalValue.textContent = Math.floor(total);
    };
    //при смене - происходит подсчет(вызов функции countSum())
    calcBlock.addEventListener("change", (event) => {
      const target = event.target;

      if (
        target === calcType ||
        target === calcSquare ||
        target === calcDay ||
        target === calcCount
      ) {
        countSum();
      }
    });
  };
  calculate(100);

  //send-ajax=form

  const sendForm = () => {
    const errorMessage = "Что-то пошло не так...",
      loadMessage = "Подождите,пожалуйста,идет отправка...",
      successMessage = "Спасибо! Мы скоро с вами свяжемся!";
    const form1 = document.getElementById("form1"),
      form2 = document.getElementById("form2"),
      form3 = document.getElementById("form3");

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = `font-size: 2rem;`;

    //Валидация данных(в поля можно ввести  только цифры и знак “+”)
    const valideDataPhone = (form) => {
      if (form.querySelector(".form-phone")) {
        form
          .querySelector(".form-phone")
          .addEventListener(
            "input",
            (e) =>
              (e.target.value = e.target.value.replace(
                /[^[^+\d]*(\+|\d)|\D/g,
                "$1"
              ))
          );
      }
      //Кириллица
      if (form.querySelector(".form-name", "form2-name")) {
        form
          .querySelector(".form-name", "form2-name")
          .addEventListener(
            "input",
            (e) => (e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ""))
          );
      }
      //И пробелы
      if (form.querySelector(".mess")) {
        form
          .querySelector(".mess")
          .addEventListener(
            "input",
            (e) => (e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ""))
          );
      }
      if (form.querySelector(".top-form")) {
        form
          .querySelector(".top-form")
          .addEventListener(
            "input",
            (e) => (e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ""))
          );
      }
    };
    valideDataPhone(form1);
    valideDataPhone(form2);
    valideDataPhone(form3);
    //Слушатели при отправке
    form1.addEventListener("submit", (e) => {
      e.preventDefault();
      form1.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form1);
      let body = {};
      formData.forEach((value, key) => (body[key] = value));
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("status network not 200");
          }
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          console.error(error);
          statusMessage.textContent = errorMessage;
        });

      form1.querySelectorAll("input").forEach((item) => (item.value = ""));
    });
    form2.addEventListener("submit", (e) => {
      e.preventDefault();
      form2.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form2);
      let body = {};
      formData.forEach((value, key) => (body[key] = value));
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("status network not 200");
          }
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          console.error(error);
          statusMessage.textContent = errorMessage;
        });

      form2.querySelectorAll("input").forEach((item) => (item.value = ""));
    });
    form3.addEventListener("submit", (e) => {
      e.preventDefault();
      form3.appendChild(statusMessage);
      statusMessage.style.color = "#fff";
      statusMessage.textContent = loadMessage;

      const formData = new FormData(form3);
      let body = {};
      formData.forEach((value, key) => (body[key] = value));
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("status network not 200");
          }
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          console.error(error);
          statusMessage.textContent = errorMessage;
        });

      form3.querySelectorAll("input").forEach((item) => (item.value = ""));
    });

    //Отправка данных на сервер

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
    };
  };
  sendForm();
});

// return new Promise((resolve, reject) => {
//   const request = new XMLHttpRequest();
//   request.addEventListener('readystatechange', () => {
//     if (request.readyState !== 4) return;
//     if (request.status === 200) resolve();
//     else reject(request.status);
//   });
//   request.open('POST', './server.php');
//   request.setRequestHeader('Content-Type', 'application/json');
//   request.send(JSON.stringify(body));
// });
