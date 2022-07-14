let albumsWrapperEl = document.querySelector("#albums-wrapper");

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
    .then((singleAlbum) => {
      console.log("singleAlbum", singleAlbum);
    });
}

function renderAllAlbums() {
  fetch(
    `https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15`
  )
    .then((res) => res.json())
    .then((albums) => {
      albums.map((singleAlbum) => {
        console.log(singleAlbum);

        renderSingleAlbum(singleAlbum);
      });
    });
}

function renderSingleAlbum(album) {
  let albumItem = document.createElement("div");
  albumItem.classList.add("album-item");

  let albumTitle = document.createElement("h3");
  let capitalizeTitle = capitalize(album.title);

  albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}">${capitalizeTitle} (${album.photos.length})</a>`;

  let albumAuthor = document.createElement("a");
  albumAuthor.textContent = `Album created by: ${album.user.name}`;
  albumAuthor.href = `./user.html?user_id=${album.user.id}`;

  let imgEl = document.createElement("img");
  imgEl.src = `${album.photos[0].thumbnailUrl}`;

  albumItem.append(imgEl, albumTitle, albumAuthor);
  albumsWrapperEl.prepend(albumItem);
}

albumsInit();
