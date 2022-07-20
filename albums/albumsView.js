import { capitalize } from "../functions.js";

function albumsView(data) {
  let { albumsData, wrapperSelector, allAlbums } = data;

  let swiperWrapperAlbumsEl = document.querySelector(wrapperSelector);
  let albumsWrapperTitle = document.querySelector("#albums-wrapper-title");

  if (allAlbums) {
    albumsWrapperTitle.textContent = `All albums`;
  } else {
    albumsWrapperTitle.textContent = `Albums of ${albumsData[0].user.name}`;
  }

  albumsData.map((album) => {
    let albumItem = document.createElement("div");
    albumItem.classList.add("swiper-slide");

    let albumTitle = document.createElement("h3");
    let capitalizeTitle = capitalize(album.title);

    albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${capitalizeTitle} (${album.photos.length})</a>`;

    let albumAuthor = document.createElement("span");
    albumAuthor.classList.add("span-text");
    let authorText = allAlbums ? `Album created by: ${album.user.name}` : "";
    albumAuthor.textContent = authorText;

    let imgEl = document.createElement("img");
    imgEl.src = `${album.photos[0].thumbnailUrl}`;

    albumItem.append(imgEl, albumTitle, albumAuthor);
    swiperWrapperAlbumsEl.prepend(albumItem);
  });
}

export { albumsView };
