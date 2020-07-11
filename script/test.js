'use strict';



class CarWash {
    constructor(barand, model, service = []) {
        this.barand = barand;
        this.model = model;
        this.washed = true;
        this._service = service;
    }
    washReady() {
        this.whashed = true;
        this.repotr();
    }
    repotr() {
        console.log(this.barand, this.model, this.washed);
    }

    get service() {
        return this._service.length > 0 ? 'Есть доп услуги' : 'Нет доп услуг';
    }
    set service(value) {
        return this._service.push(value);
    }
}

class PassWash extends CarWash {
    washReady() {
        console.log('worck');

    }
}

const car1 = new CarWash('mazda', '3', ['протирка стекол', 'покрытие воском']);
const car2 = new PassWash('BMW', 'x5');


car1.washReady();
car2.washReady();




