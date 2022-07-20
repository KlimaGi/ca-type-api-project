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
    //let albumsData = await getAllAlbumsByUserId(userId);
    albumsView({
      albumsData: await getAllAlbumsByUserId(userId),
      wrapperSelector: "#swiper-wrapper-all-albums",
      allAlbums: false,
    });
    return;
  }

  //let albumsData = await getAllExpandedAlbums(15);

  albumsView({
    albumsData: await getAllExpandedAlbums(15),
    wrapperSelector: "#swiper-wrapper-all-albums",
    allAlbums: true,
  });
}

albumsInit();
