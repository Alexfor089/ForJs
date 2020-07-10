class First {
   constructor() {}
   helo() {
      console.log('Привет я метод родителя!');
   }
}

class Second extends First {
   helo() {
      super.helo()
      console.log('А я наследуемый метод!');
   }
}

const first = new First();
const second = new Second();

first.helo();
second.helo();

console.log(first);
console.log(second);
// class Second extends First {
//    helo() {

//       console.log('Привет я метод родителя!');
//       this.helloSecond();
//    }
//    helloSecond() {
//       console.log('А я наследуемый метод!');
//    }

// }

// const first = new First();
// const second = new Second();

// first.helo();
// second.helloSecond();