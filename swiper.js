const mySwiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  slidesPerColumn: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  grid: {
    fill: "rows",
    rows: 3,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    init: function () {},
    orientationchange: function () {},
    beforeResize: function () {
      let vw = window.innerWidth;
      if (vw > 1500) {
        mySwiper.params.slidesPerView = 5;
        mySwiper.params.slidesPerColumn = 1;
        mySwiper.params.slidesPerGroup = 5;
      } else if (vw > 1000) {
        mySwiper.params.slidesPerView = 4;
        mySwiper.params.slidesPerColumn = 1;
        mySwiper.params.slidesPerGroup = 4;
      } else if (vw > 500) {
        mySwiper.params.slidesPerView = 3;
        mySwiper.params.slidesPerColumn = 1;
        mySwiper.params.slidesPerGroup = 3;
      } else {
        mySwiper.params.slidesPerView = 2;
        mySwiper.params.slidesPerColumn = 1;
        mySwiper.params.slidesPerGroup = 2;
      }
      console.log("mySwiper.params", mySwiper.params);
      mySwiper.init();
    },
  },
});
