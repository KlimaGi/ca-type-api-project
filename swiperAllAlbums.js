const allAlbumsSwiper = new Swiper(".swiper-container", {
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
        allAlbumsSwiper.params.slidesPerView = 4;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 4;
      } else if (vw > 1000) {
        allAlbumsSwiper.params.slidesPerView = 3;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 3;
      } else if (vw > 500) {
        allAlbumsSwiper.params.slidesPerView = 2;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 2;
      } else if (vw < 500) {
        allAlbumsSwiper.params.slidesPerView = 1;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 1;
      }
      // console.log("mySwiper.params", mySwiper.params);
      allAlbumsSwiper.init();
    },
  },
});
