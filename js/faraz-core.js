const hamberBtn = document.querySelector("#hamber-menu"),
  navBar = document.querySelector("nav.menu"),
  navCloser = document.querySelector("#nav-closer");
hamberBtn.addEventListener("click", () => {
  navBar.classList.remove("translate-x-[1890px]");
});
navCloser.addEventListener("click", () => {
  navBar.classList.add("translate-x-[1890px]");
});

// _________________________________swipers_____________________________________
// _________________________________swipers_____________________________________
// _________________________________swipers_____________________________________

var swiper = new Swiper(".first-swiper", {
  slidesPerView: 4,
  speed: 400,
  centeredSlides: false,
  spaceBetween: 30,
  grabCursor: true,
     autoplay: {
       delay: 2500,
       disableOnInteraction: false,
     },
     loop: true,
  pagination: {
    el: ".swiper-pagination-first",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-first",
    prevEl: ".swiper-button-prev-first",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
