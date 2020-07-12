function getDate() {
   let date = new Date();
   let now = new Date().toLocaleTimeString();

   function getWeekDay(date) {
      let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

      return days[date.getDay()];
   }

   function getStateDay(date) {
      let state = ['Ночь', 'Утро', 'День', 'Вечер'];

      return state[date.getDay()];
   }

   document.write('Добрый: ' + getStateDay(date) + '<br>');
   document.write('Сегодня: ' + getWeekDay(date) + '<br>');
   document.write('Текущее время: ' + now + '<br>');

   function daysLeftNewYear() {
      let today = new Date(),
         nextDate = new Date("January 1, 2021"),
         msPerDay = 24 * 60 * 60 * 1000,
         daysLeft = Math.round((nextDate.getTime() - today.getTime()) / msPerDay),
         ds = "" + daysLeft;
      // dd = parseInt(ds.substr(ds.length - 1));
      document.write('До Нового года осталось: ' + daysLeft + ' дня' + '<br>');
   }
   daysLeftNewYear();
}
getDate();