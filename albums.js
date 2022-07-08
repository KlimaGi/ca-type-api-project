let albumsWrapperEl = document.querySelector("#albums-wrapper");

let capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

fetch(`https://jsonplaceholder.typicode.com/albums?_limit=15`)
  .then((res) => res.json())
  .then((albums) => {
    albums.map((album) => {
      console.log(album.id);

      fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then((res) => res.json())
        .then((user) => {
          console.log("user", user);
          fetch(
            `https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`
          )
            .then((res) => res.json())
            .then((photos) => {
              let albumItem = document.createElement("div");
              albumItem.classList.add("album-item");

              let albumTitle = document.createElement("h3");
              let capitalizeTitle = capitalize(album.title);

              albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${capitalizeTitle} (${photos.length})</a>`;

              let albumAuthor = document.createElement("a");
              albumAuthor.textContent = `Album created by: ${user.name}`;
              albumAuthor.href = `./user.html?user_id=${user.id}`;

              let imgEl = document.createElement("img");
              imgEl.src = `${photos[0].thumbnailUrl}`;

              albumItem.append(albumTitle, albumAuthor, imgEl);
              albumsWrapperEl.prepend(albumItem);
            });
        });
    });
  });
