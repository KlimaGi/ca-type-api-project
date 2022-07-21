import { renderListElement, capitalize } from "./functions.js";
import { headerView } from "./headerView.js";

headerView();

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get("user_id");

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then((res) => res.json())
  .then((user) => {
    let userInfoEl = document.querySelector("#user-info");
    userInfoEl.classList.add("user-info");

    userInfoEl.innerHTML = `<ul>
    <li><strong>Name: </strong>${user.name} (${user.username})</li>
   <li><strong>Email: </strong>${user.email}</li>
    <li><strong>Address: </strong>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</li>
    <li><strong>Phone: </strong>${user.phone}</li>
   <li><strong>Website: </strong><a class="link" href="${user.website}"> ${user.website}</a></li>
   <li><strong>Company: </strong>${user.company.name}</li>
   </ul>`;

    showMap(user.address.geo.lat, user.address.geo.lng);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((res) => res.json())
      .then((posts) => {
        let postContainer = document.querySelector("#post-container");
        let postWrapperEl = document.querySelector("#user-posts-wrapper");

        let postsTitle = document.createElement("h3");
        postsTitle.textContent = "User posts:";
        postsTitle.classList.add("page-title");

        postContainer.prepend(postsTitle);

        if (posts.length) {
          posts.map((post) => {
            let postItem = document.createElement("div");
            postItem.classList.add("post-item");

            let titleCapitalize = capitalize(post.title);
            let bodyCapitalize = capitalize(post.body);

            postItem.innerHTML = `<h4>${titleCapitalize}</h4>
                                  <p>${bodyCapitalize}</p>
                                  <a class="link" href="./post.html?post_id=${post.id}">Read more</a>`;

            postWrapperEl.append(postItem);
          });
        } else {
          let postItem = document.createElement("div");
          postItem.classList.add("post-item");
          postItem.textContent = "There is no posts...";
          postWrapperEl.append(postItem);
        }
      });
  });

let userAlbumsEl = document.querySelector("#user-albums");

fetch(
  `https://jsonplaceholder.typicode.com/users/${userId}/albums?_expand=user&_limit=3`
)
  .then((res) => res.json())
  .then((albums) => {
    console.log("albums", albums);
    let albumTitleEl = document.createElement("span");
    albumTitleEl.classList.add("title");
    albumTitleEl.textContent = "User albums: ";

    let otherAlbums = document.createElement("a");
    otherAlbums.textContent = "Other albums";
    otherAlbums.classList.add("link", "on-right-side");

    otherAlbums.setAttribute("href", `./albums.html?user_id=${userId}`);

    userAlbumsEl.append(albumTitleEl, otherAlbums);

    let userAlbumsWrapper = document.createElement("ul");
    userAlbumsWrapper.classList.add("ul-el");
    userAlbumsEl.append(userAlbumsWrapper);

    albums.map((album) => {
      let titleCapitalize = capitalize(album.title);

      let userData = {
        content: titleCapitalize,
        href: `./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${album.user.name}`,
        parentEl: userAlbumsWrapper,
      };
      renderListElement(userData);
    });
  });

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
