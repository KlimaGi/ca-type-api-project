import { capitalize } from "../functions.js";

function albumView(data) {
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

export { albumView };
