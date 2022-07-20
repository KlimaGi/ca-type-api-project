import { headerView } from "../headerView.js";
import {
  getAllAlbumsByUserId,
  getAllExpandedAlbums,
} from "./albumsController.js";
import { albumsView } from "./albumsView.js";

async function albumsInit() {
  headerView();
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    let albumsData = await getAllAlbumsByUserId(userId);
    console.log("albumsData", albumsData);
    albumsView(albumsData);

    // albums.map((singleAlbum) => {
    //   let albumData = {
    //     album: singleAlbum,
    //     title: `Albums of ${singleAlbum.user.name}`,
    //     userHref: "",
    //     userFullName: "",
    //   };
    //   albumsView(albumData);
    // });
    return;
  }

  let albums = await getAllExpandedAlbums(15);

  albums.map((singleAlbum) => {
    let albumData = {
      album: singleAlbum,
      title: "All albums:",
      userHref: `./user.html?user_id=${singleAlbum.user.id}`,
      userFullName: singleAlbum.user.name,
    };
    albumsView(albumData);
  });
}

albumsInit();
