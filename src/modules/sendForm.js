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
      form.querySelector(".form-phone").addEventListener("input", (e) => {
        if (e.target.value.length < 11 || e.target.value.length > 13) {
          form.querySelector("button").setAttribute("disabled", "disabled");
        } else {
          form.querySelector("button").removeAttribute("disabled");
        }
        e.target.value = e.target.value.replace(/[^[^+\d]*(\+|\d)|\D/g, "$1");
      });
    }
    //Кириллица
    if (form.querySelector(".form-name", "form2-name")) {
      form
        .querySelector(".form-name", "form2-name").addEventListener("input", (e) => {
          if (e.target.value.length < 2 || e.target.value.length > 12) {
            form.querySelector("button").setAttribute("disabled", "disabled");
          } else {
            form.querySelector("button").removeAttribute("disabled");
          }
          e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, "");
        });
    }
    //И пробелы
    if (form.querySelector(".mess")) {
      form
        .querySelector(".mess")
        .addEventListener(
          "input", (e) => {
            if (e.target.value.length < 5 || e.target.value.length > 50) {
              form.querySelector("button").setAttribute("disabled", "disabled");
            } else {
              form.querySelector("button").removeAttribute("disabled");
            }
            e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, "");
          });
    }
    if (form.querySelector(".top-form")) {
      form
        .querySelector(".top-form")
        .addEventListener(
          "input",
          (e) => {
            if (e.target.value.length < 5 || e.target.value.length > 50) {
              form.querySelector("button").setAttribute("disabled", "disabled");
            } else {
              form.querySelector("button").removeAttribute("disabled");
            }
            e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, "");
          });
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
    setTimeout(() => {
      statusMessage.textContent = "";
    }, 3000);


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
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
      });
    setTimeout(() => {
      statusMessage.textContent = "";
    }, 3000);

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
    setTimeout(() => {
      statusMessage.textContent = "";
    }, 3000);

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
export default sendForm;