const swiper = new Swiper(".swiper", {
  grid: {
    columns: 2,
    fill: rows,
  },

  // speed: 400,
  // spaceBetween: 10,
  // centeredSlides: true,
  // createElements: true,
  // init: true,
  // rewind: true,
  // roundLengths: true,
  // slidesPerGroup: 1,
  // effect: "coverflow",
  // coverflowEffect: {
  //   rotate: 30,
  //   depth: 100,
  //   modifier: 1,
  //   scale: 1,
  //   slideShadows: true,
  //   stretch: 0,
  //   transformEl: null,
  // },

  // Optional parameters
  direction: "horizontal",
  // loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
const swiperSlide = document.querySelector(".swiper").swiper;
swiperSlide.slideNext();
