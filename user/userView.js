import { renderListElement, capitalize } from "../functions.js";

function renderUserInfo(user) {
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
}

function renderUserPosts(posts) {
  let postContainer = document.querySelector("#post-container");
  let postWrapperEl = document.querySelector("#user-posts-wrapper");

  let postsTitle = document.createElement("h3");
  postsTitle.textContent = "User posts:";
  postsTitle.classList.add("page-title");

  postContainer.prepend(postsTitle);

  if (posts.length) {
    posts.map((post) => {
      renderSinglePost(post, postWrapperEl);
    });
  } else {
    let postItem = document.createElement("div");
    postItem.classList.add("post-item");
    postItem.textContent = "There is no posts...";
    postWrapperEl.append(postItem);
  }
}

function renderSinglePost(post, postWrapperEl) {
  let { title, body, id } = post;
  let postItem = document.createElement("div");
  postItem.classList.add("post-item");

  let titleCapitalize = capitalize(title);
  let bodyCapitalize = capitalize(body);

  postItem.innerHTML = `<h4>${titleCapitalize}</h4>
                                  <p>${bodyCapitalize}</p>
                                  <a class="link" href="./post.html?post_id=${id}">Read more</a>`;

  postWrapperEl.append(postItem);
}

function renderAlbumsListByUserId(userId, albums) {
  let userAlbumsEl = document.querySelector("#user-albums");
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
}

export { renderUserInfo, renderUserPosts, renderAlbumsListByUserId };
