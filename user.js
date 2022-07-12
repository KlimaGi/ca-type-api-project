let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get("user_id");

let capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

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
   <li><strong>Website: </strong><a href="${user.website}"> ${user.website}</a></li>
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

            postItem.innerHTML = `<h4>${titleCapitalize}</h4>
                                  <p>${post.body}</p>
                                  <a href="./post.html?post_id=${post.id}">Read more</a>`;

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

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  .then((res) => res.json())
  .then((albums) => {
    let albumTitleEl = document.createElement("h3");
    albumTitleEl.textContent = "User albums: ";

    userAlbumsEl.append(albumTitleEl);

    let userAlbumsWrapper = document.createElement("ul");
    userAlbumsWrapper.classList.add("ul-el");
    userAlbumsEl.append(userAlbumsWrapper);

    albums.map((album) => {
      let albumItem = document.createElement("li");
      albumItem.classList.add("li-el");
      let titleCapitalize = capitalize(album.title);
      albumItem.innerHTML = `<a href="./album.html">${titleCapitalize}</a>`;

      userAlbumsWrapper.append(albumItem);
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
