import { capitalize } from "./functions.js";

let albumsWrapperEl = document.querySelector("#albums-wrapper");
let albumsWrapperTitle = document.querySelector("#albums-wrapper-title");

function albumsInit() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    renderAlbumsByUserId(userId);
  } else {
    renderAllAlbums();
  }
}

function renderAlbumsByUserId(id) {
  fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`
  )
    .then((res) => res.json())
    .then((albums) => {
      console.log("albums", albums);

      // let albumItem = document.createElement("div");
      // albumItem.classList.add("album-item");

      // albumsWrapperTitle.textContent = `Albums of ${singleAlbum.user.name}`;

      // let albumTitle = document.createElement("h3");
      // let capitalizeTitle = capitalize(album.title);

      // albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${capitalizeTitle} (${album.photos.length})</a>`;

      // let imgEl = document.createElement("img");
      // imgEl.src = `${album.photos[0].thumbnailUrl}`;

      // albumItem.append(imgEl, albumTitle);
      // albumsWrapperEl.prepend(albumItem);
    });
}

function renderAllAlbums() {
  fetch(
    `https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15`
  )
    .then((res) => res.json())
    .then((albums) => {
      albums.map((singleAlbum) => {
        let albumData = {
          album: singleAlbum,
          title: "All albums:",
          userHref: `./user.html?user_id=${singleAlbum.user.id}`,
          userFullName: singleAlbum.user.name,
        };
        renderSingleAlbum(albumData);
      });
    });
}

function renderSingleAlbum(data) {
  let { album, title, userHref, userFullName } = data;

  let albumItem = document.createElement("div");
  albumItem.classList.add("album-item");

  let albumTitle = document.createElement("h3");
  let capitalizeTitle = capitalize(album.title);

  albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${capitalizeTitle} (${album.photos.length})</a>`;

  let albumAuthor = document.createElement("a");
  albumAuthor.textContent = `Album created by: ${userFullName}`;
  albumAuthor.href = userHref;

  let imgEl = document.createElement("img");
  imgEl.src = `${album.photos[0].thumbnailUrl}`;

  albumsWrapperTitle.textContent = title;
  albumItem.append(imgEl, albumTitle, albumAuthor);
  albumsWrapperEl.prepend(albumItem);
}

albumsInit();
