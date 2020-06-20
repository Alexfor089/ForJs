"use strict";

document.body.style.backgroundImage = "url(/image/you-dont-know-js.jpg)";
let books = document.querySelectorAll(".books");
let book = document.querySelectorAll(".book");
let title = document.getElementsByTagName("a");
let adv = document.querySelector(".adv");
let list = document.querySelectorAll("ul");
let listOfBook2 = book[0].querySelectorAll("li");
let listOfBook5 = book[5].querySelectorAll("li");
let listOfBook6 = book[2].querySelectorAll("li");

console.log(books);
console.log(book);
books[0].append(book[2]);
book[2].before(book[3]);
book[4].after(book[3]);
books[0].prepend(book[1]);
//Изменение текста в пункте 3
title[2].textContent = "Книга 3. this и Прототипы Объектов";
//Удаление рекламы
adv.remove();

//2 карточка

listOfBook2[2].before(listOfBook2[3]);
listOfBook2[3].after(listOfBook2[6]);
listOfBook2[2].before(listOfBook2[8]);
listOfBook2[10].before(listOfBook2[2]);

//5 карточка
listOfBook5;

listOfBook5[2].before(listOfBook5[9]);
listOfBook5[9].after(listOfBook5[3]);
listOfBook5[3].after(listOfBook5[4]);
listOfBook5[8].before(listOfBook5[5]);

// 6 карточка

listOfBook6[8].insertAdjacentText("afterend", "Глава 8: За пределами ES6");
