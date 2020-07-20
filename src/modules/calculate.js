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
export default calculate;