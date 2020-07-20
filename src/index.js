"use strict";
import "@babel/polyfill";
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import sliderFoo from "./modules/sliderFoo";
import changePhoto from "./modules/changePhoto";
import calculate from "./modules/calculate";
import sendForm from "./modules/sendForm";

//Timer
countTimer("21  july 2020");
// menu
toggleMenu();
//popup
togglePopup();
//Tabs
tabs();
//slider
sliderFoo();
//Ззменеие фотографий по наведению в блоке "Наша команда" на другие из data-img
changePhoto();
//Калькулятор
calculate(100);
//send-ajax=form
sendForm();
