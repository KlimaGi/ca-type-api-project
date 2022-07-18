const singleAlbumSwiper = new Swiper(".swiper-container", {
  slidesPerView: 2,
  slidesPerColumn: 3,
  slidesPerGroup: 3,
  spaceBetween: 20,
  toggle: true,
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
        singleAlbumSwiper.params.slidesPerView = 4;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 4;
      } else if (vw > 1000) {
        singleAlbumSwiper.params.slidesPerView = 3;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 3;
      } else if (vw > 500) {
        singleAlbumSwiper.params.slidesPerView = 2;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 2;
      } else if (vw < 500) {
        singleAlbumSwiper.params.slidesPerView = 1;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 1;
      }
      // console.log("mySwiper.params", mySwiper.params);
      singleAlbumSwiper.init();
    },
  },
});
