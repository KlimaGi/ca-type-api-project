import { capitalize } from "./functions.js";
import { headerView } from "./headerView.js";
import { album } from "./albumView.js";

headerView();

function albumInit() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let albumId = urlParams.get("album_id");
  let albumTitle = urlParams.get("album_title");
  let userId = urlParams.get("user_id");
  let userName = urlParams.get("user_name");

  if (!albumId) {
    let swiperWrapperEl = document.querySelector(".swiper-wrapper");
    let textEl = document.createElement("p");
    textEl.innerHTML =
      "No albums... <a class='link' href='./albums.html'>Try here</a>";

    swiperWrapperEl.append(textEl);
    return;
  }

  if (albumTitle && userId && userName) {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((res) => res.json())
      .then((albumPhotos) => {
        let dataObj = {
          photos: albumPhotos,
          albumTitle,
          userId,
          userName,
        };
        renderAlbumsPage(dataObj);
      });
    return;
  }

  fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`
  )
    .then((res) => res.json())
    .then((album) => {
      let { photos, title, user } = album;

      let dataObj = {
        photos,
        albumTitle: title,
        userId: user.id,
        userName: user.name,
      };

      renderAlbumsPage(dataObj);
    });
}

function renderAlbumsPage(data) {
  let { photos, albumTitle, userId, userName } = data;

  let containerEl = document.querySelector("#album-container");
  let swiperWrapperEl = document.querySelector("#swiper-wrapper-single-album");

  if (photos.length) {
    let albumTitleEl = document.createElement("h3");
    albumTitleEl.classList.add("title");
    albumTitleEl.textContent = capitalize(albumTitle);

    let albumAuthorEl = document.createElement("p");
    albumAuthorEl.classList.add("album-author");
    albumAuthorEl.innerHTML = `<strong>Album author: </strong><a class="link" href="./user.html?user_id=${userId}">${userName}</a>`;

    containerEl.append(albumTitleEl, albumAuthorEl);

    photos.map((photo) => {
      let albumPhotoItem = document.createElement("div");
      albumPhotoItem.classList.add("swiper-slide");

      let imageEl = document.createElement("img");
      imageEl.setAttribute("src", photo.thumbnailUrl);
      imageEl.setAttribute("alt", photo.title);
      albumPhotoItem.append(imageEl);
      swiperWrapperEl.prepend(albumPhotoItem);
    });
  } else {
    let textEl = document.createElement("p");
    textEl.innerHTML =
      "No albums... <a class='link' href='./albums.html'>Try here</a>";

    swiperWrapperEl.append(textEl);
  }
}

albumInit();
