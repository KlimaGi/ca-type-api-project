import { capitalize } from "../functions.js";

function albumsView(data) {
  let swiperWrapperAlbumsEl = document.querySelector(
    "#swiper-wrapper-all-albums"
  );
  let albumsWrapperTitle = document.querySelector("#albums-wrapper-title");
  let { album, title, userHref, userFullName } = data;

  let albumItem = document.createElement("div");
  albumItem.classList.add("swiper-slide");

  let albumTitle = document.createElement("h3");
  let capitalizeTitle = capitalize(album.title);

  albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${capitalizeTitle} (${album.photos.length})</a>`;

  let albumAuthor = document.createElement("a");
  let text = userFullName ? `Album created by: ${userFullName}` : "";
  albumAuthor.textContent = text;
  albumAuthor.href = userHref;

  let imgEl = document.createElement("img");
  imgEl.src = `${album.photos[0].thumbnailUrl}`;

  albumsWrapperTitle.textContent = title;
  albumItem.append(imgEl, albumTitle, albumAuthor);
  swiperWrapperAlbumsEl.prepend(albumItem);
}

export { albumsView };
