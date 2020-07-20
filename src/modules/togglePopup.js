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
export default togglePopup;