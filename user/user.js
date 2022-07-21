import { headerView } from "../headerView.js";
import {
  getUserById,
  getPostsByUserId,
  getAlbumsByUserId,
} from "./userController.js";
import {
  renderUserInfo,
  renderUserPosts,
  renderAlbumsListByUserId,
} from "./userView.js";

async function userInit() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  let user = await getUserById(userId);
  renderUserInfo(user);

  showMap(user.address.geo.lat, user.address.geo.lng);

  let posts = await getPostsByUserId(userId);
  renderUserPosts(posts);

  let albums = await getAlbumsByUserId(userId, 3);
  renderAlbumsListByUserId(userId, albums);
}

userInit();

function showMap(latitude, longitude) {
  let map = L.map("map").setView([latitude, longitude], 3);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  var circle = L.circle([latitude, longitude], {
    color: "hsl(196, 74%, 29%)",
    fillColor: "hsl(196, 74%, 29%)",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
}
