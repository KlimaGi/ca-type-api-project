let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get("album_id");
let albumTitle = urlParams.get("album_title");
let userId = urlParams.get("user_id");
let userName = urlParams.get("user_name");

console.log(albumId);
console.log(albumTitle);
console.log(userId);
console.log(userName);

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then((res) => res.json())
  .then((photos) => {
    let albumWrapperEl = document.querySelector("#album-wrapper");

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
