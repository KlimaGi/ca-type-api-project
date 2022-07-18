import { capitalize } from "./functions.js";
import { headerView } from "./headerView.js";

headerView();

let postsWrapperEl = document.querySelector("#posts-wrapper");
let postsListTitle = document.createElement("h2");
postsListTitle.classList.add("page-title");
let postsList = document.createElement("ul");
postsList.classList.add("ul-el");
postsWrapperEl.append(postsListTitle, postsList);

function postsInit() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    renderPostsByUserId(userId);
  } else {
    renderAllPostsList();
  }
}
postsInit();

function renderPostsByUserId(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`)
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      postsListTitle.textContent = `Posts of ${user.name}:`;

      user.posts.map((post) => {
        let postItem = document.createElement("li");
        postItem.classList.add("li-el");
        let titleCapitalize = capitalize(post.title);
        postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${titleCapitalize}</a>`;

        postsList.prepend(postItem);
      });
    });
}

function renderAllPostsList() {
  fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user`)
    .then((res) => res.json())
    .then((posts) => {
      postsListTitle.textContent = "All Posts: ";

      posts.map((post) => {
        let postItem = document.createElement("li");
        postItem.classList.add("li-el");
        let titleCapitalize = capitalize(post.title);
        postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${titleCapitalize} (${post.user.name})</a>`;

        postsList.prepend(postItem);
      });
    });
}
