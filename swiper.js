const singleAlbumSwiper = new Swiper(".swiper-container", {
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
        singleAlbumSwiper.params.slidesPerView = 5;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 5;
      } else if (vw > 1000) {
        singleAlbumSwiper.params.slidesPerView = 4;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 4;
      } else if (vw > 500) {
        singleAlbumSwiper.params.slidesPerView = 3;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 3;
      } else {
        singleAlbumSwiper.params.slidesPerView = 2;
        singleAlbumSwiper.params.slidesPerColumn = 1;
        singleAlbumSwiper.params.slidesPerGroup = 2;
      }
      // console.log("mySwiper.params", mySwiper.params);
      singleAlbumSwiper.init();
    },
  },
});

const allAlbumsSwiper = new Swiper(".swiper-container", {
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
        allAlbumsSwiper.params.slidesPerView = 5;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 5;
      } else if (vw > 1000) {
        allAlbumsSwiper.params.slidesPerView = 4;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 4;
      } else if (vw > 500) {
        allAlbumsSwiper.params.slidesPerView = 3;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 3;
      } else {
        allAlbumsSwiper.params.slidesPerView = 2;
        allAlbumsSwiper.params.slidesPerColumn = 1;
        allAlbumsSwiper.params.slidesPerGroup = 2;
      }
      // console.log("mySwiper.params", mySwiper.params);
      allAlbumsSwiper.init();
    },
  },
});
