import { headerView } from "../headerView.js";
import { albumView } from "./albumView.js";
import { getPhotosByAlbumId, getExpandedAlbumById } from "./albumController.js";

async function albumInit() {
  headerView();
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let albumId = urlParams.get("album_id");
  let albumTitle = urlParams.get("album_title");
  let userId = urlParams.get("user_id");
  let userName = urlParams.get("user_name");

  if (!albumId) {
    let swiperWrapperEl = document.querySelector(".swiper-wrapper");
    let textEl = document.createElement("p");
    textEl.innerHTML =
      "No albums... <a class='link' href='./albums.html'>Try here</a>";

    swiperWrapperEl.append(textEl);
    return;
  }

  if (albumTitle && userId && userName) {
    let albumPhotos = await getPhotosByAlbumId(albumId);

    // let dataObj = {
    //   photos: await getPhotosByAlbumId(albumId),
    //   albumTitle,
    //   userId,
    //   userName,
    // };

    let dataObj = {
      photos: albumPhotos,
      albumTitle,
      userId,
      userName,
    };
    albumView(dataObj);

    return;
  }

  let albumData = await getExpandedAlbumById(albumId);
  console.log("albumData", albumData);
  fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`
  )
    .then((res) => res.json())
    .then((album) => {
      let { photos, title, user } = album;

      let dataObj = {
        photos,
        albumTitle: title,
        userId: user.id,
        userName: user.name,
      };

      albumView(dataObj);
    });
}

albumInit();
