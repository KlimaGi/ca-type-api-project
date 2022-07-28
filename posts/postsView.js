import { capitalize } from "../functions.js";
import { renderPaginationLinks } from "../pagination.js";

function renderPostsByUserId(posts) {
  let postsWrapperEl = document.querySelector("#posts-wrapper");
  let titleAndBtnWrapperEl = document.createElement("div");
  titleAndBtnWrapperEl.classList.add("title-btn-wrapper");

  let postsListTitle = document.createElement("h2");
  postsListTitle.classList.add("page-title");
  postsListTitle.textContent = `Posts of ${posts[0].user.name}:`;

  let createPostBtnEl = document.createElement("a");
  createPostBtnEl.textContent = "Create Post";
  createPostBtnEl.classList.add("link-btn");
  createPostBtnEl.setAttribute("href", "./create-post.html");

  let postsList = document.createElement("ul");
  postsList.classList.add("ul-el");

  titleAndBtnWrapperEl.append(postsListTitle, createPostBtnEl);
  postsWrapperEl.append(titleAndBtnWrapperEl, postsList);

  posts.map((post) => {
    let postItem = document.createElement("li");
    postItem.classList.add("li-el");
    let titleCapitalize = capitalize(post.title);
    postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${titleCapitalize}</a>`;

    postsList.prepend(postItem);
  });
}

async function renderAllPostsList(posts, page, limit, segment, total) {
  let postsWrapperEl = document.querySelector("#posts-wrapper");
  let titleAndBtnWrapperEl = document.createElement("div");
  titleAndBtnWrapperEl.classList.add("title-btn-wrapper");

  let postsListTitle = document.createElement("h2");
  postsListTitle.classList.add("page-title");
  postsListTitle.textContent = "All Posts: ";

  let createPostBtnEl = document.createElement("a");
  createPostBtnEl.textContent = "Create Post";
  createPostBtnEl.classList.add("link-btn");
  createPostBtnEl.setAttribute("href", "./create-post.html");

  let postsList = document.createElement("ul");
  postsList.classList.add("ul-el");

  titleAndBtnWrapperEl.append(postsListTitle, createPostBtnEl);
  postsWrapperEl.append(titleAndBtnWrapperEl, postsList);

  posts.map((post) => {
    let { title, id, user } = post;
    let postItem = document.createElement("li");
    postItem.classList.add("li-el");
    let titleCapitalize = capitalize(title);
    postItem.innerHTML = `<a href="./post.html?post_id=${id}">${titleCapitalize} (${user.name})</a>`;

    postsList.prepend(postItem);
  });

  let parentSelector = "#posts-wrapper";

  renderPaginationLinks(parentSelector, page, limit, segment, total);
}

export { renderPostsByUserId, renderAllPostsList };
