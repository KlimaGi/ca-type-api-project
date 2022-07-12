let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get("album_id");
let albumTitle = urlParams.get("album_title");
let userId = urlParams.get("user_id");
let userName = urlParams.get("user_name");

const swiper = new Swiper(".swiper", {
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
  loop: true,

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

// renderPhotos();
function renderPhotos() {
  fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
    .then((res) => res.json())
    .then((photos) => {
      let albumWrapperEl = document.querySelector("#album-wrapper");
      console.log("photos", photos);
      if (photos.length) {
        let albumTitleEl = document.createElement("h3");
        albumTitleEl.classList.add("album-title");
        albumTitleEl.textContent = albumTitle;

        let albumAuthorEl = document.createElement("span");
        albumAuthorEl.classList.add("album-author");
        albumAuthorEl.innerHTML = `<strong>Album author: </strong><a href="./user.html?user_id=${userId}">${userName}</a>`;

        let albumPhotos = document.createElement("div");
        albumPhotos.classList.add("album-photos");

        albumWrapperEl.append(albumTitleEl, albumAuthorEl, albumPhotos);

        photos.map((photo) => {
          let imageEl = document.createElement("img");
          imageEl.src = photo.thumbnailUrl;
          imageEl.setAttribute("alt", photo.title);

          albumPhotos.prepend(imageEl);
        });
      } else {
        let textEl = document.createElement("p");
        textEl.innerHTML = "No albums... <a href='./albums.html'>Try here</a>";

        albumWrapperEl.append(textEl);
      }
    });
}

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then((res) => res.json())
  .then((photos) => {
    let swiperWrapperEl = document.querySelector(".swiper-wrapper");

    if (photos.length) {
      let albumTitleEl = document.createElement("h3");
      albumTitleEl.classList.add("album-title");
      albumTitleEl.textContent = albumTitle;

      let albumAuthorEl = document.createElement("span");
      albumAuthorEl.classList.add("album-author");
      albumAuthorEl.innerHTML = `<strong>Album author: </strong><a href="./user.html?user_id=${userId}">${userName}</a>`;

      photos.map((photo) => {
        let albumPhoto = document.createElement("div");
        albumPhoto.classList.add("swiper-slide");

        let imageEl = document.createElement("img");
        imageEl.setAttribute("src", photo.thumbnailUrl);
        imageEl.setAttribute("alt", photo.title);
        albumPhoto.append(imageEl);
        swiperWrapperEl.prepend(albumPhoto);
      });
    } else {
      let textEl = document.createElement("p");
      textEl.innerHTML = "No albums... <a href='./albums.html'>Try here</a>";

      swiperWrapperEl.append(textEl);
    }
  });
