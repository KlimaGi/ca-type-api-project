const albumSwiper = new Swiper(".swiper-container", {
  slidesPerView: 2,
  slidesPerColumn: 2,
  slidesPerGroup: 2,
  spaceBetween: 20,
  grid: {
    fill: "rows",
    rows: 2,
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
        albumSwiper.params.slidesPerView = 4;
        albumSwiper.params.slidesPerColumn = 1;
        albumSwiper.params.slidesPerGroup = 4;
      } else if (vw > 1000) {
        albumSwiper.params.slidesPerView = 3;
        albumSwiper.params.slidesPerColumn = 1;
        albumSwiper.params.slidesPerGroup = 3;
      } else if (vw > 500) {
        albumSwiper.params.slidesPerView = 2;
        albumSwiper.params.slidesPerColumn = 1;
        albumSwiper.params.slidesPerGroup = 2;
      } else if (vw < 500) {
        albumSwiper.params.slidesPerView = 1;
        albumSwiper.params.slidesPerColumn = 1;
        albumSwiper.params.slidesPerGroup = 1;
      }
      // console.log("mySwiper.params", mySwiper.params);
      albumSwiper.init();
    },
  },
});
