import { headerView } from "../headerView.js";
import { getAllAlbumsByUserId } from "./albumsController.js";
import { albumsView } from "./albumsView.js";

function albumsInit() {
  headerView();
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    renderAlbumsByUserId(userId);
  } else {
    renderAllAlbums();
  }
}

async function renderAlbumsByUserId(id) {
  let albums = await getAllAlbumsByUserId(id);

  albums.map((singleAlbum) => {
    let albumData = {
      album: singleAlbum,
      title: `Albums of ${singleAlbum.user.name}`,
      userHref: "",
      userFullName: "",
    };
    albumsView(albumData);
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
        albumsView(albumData);
      });
    });
}

albumsInit();
