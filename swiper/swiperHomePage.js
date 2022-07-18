const homeSwiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  slidesPerColumn: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  grid: {
    fill: "rows",
    rows: 1,
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
        homeSwiper.params.slidesPerView = 4;
        homeSwiper.params.slidesPerColumn = 1;
        homeSwiper.params.slidesPerGroup = 4;
      } else if (vw > 1000) {
        homeSwiper.params.slidesPerView = 3;
        homeSwiper.params.slidesPerColumn = 1;
        homeSwiper.params.slidesPerGroup = 3;
      } else if (vw > 500) {
        homeSwiper.params.slidesPerView = 2;
        homeSwiper.params.slidesPerColumn = 1;
        homeSwiper.params.slidesPerGroup = 2;
      } else if (vw < 500) {
        homeSwiper.params.slidesPerView = 1;
        homeSwiper.params.slidesPerColumn = 1;
        homeSwiper.params.slidesPerGroup = 1;
      }
      // console.log("mySwiper.params", mySwiper.params);
      homeSwiper.init();
    },
  },
});
