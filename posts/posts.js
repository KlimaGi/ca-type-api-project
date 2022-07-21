import { capitalize } from "../functions.js";
import { headerView } from "../headerView.js";
import {
  getUserByIdEmbedPosts,
  getAllPostsExpandUser,
} from "./postsController.js";
import { renderPostsView } from "./postsView.js";

function postsInit() {
  headerView();

  let postsWrapperEl = document.querySelector("#posts-wrapper");
  let titleAndBtnWrapperEl = document.createElement("div");
  titleAndBtnWrapperEl.classList.add("title-btn-wrapper");

  // let postsListTitle = document.createElement("h2");
  // postsListTitle.classList.add("page-title");

  let createPostBtnEl = document.createElement("a");
  createPostBtnEl.textContent = "Create Post";
  createPostBtnEl.classList.add("link-btn");
  createPostBtnEl.setAttribute("href", "./create-post.html");

  // let postsList = document.createElement("ul");
  // postsList.classList.add("ul-el");

  titleAndBtnWrapperEl.append(createPostBtnEl);
  postsWrapperEl.append(titleAndBtnWrapperEl);

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    renderPostsByUserId(userId, titleAndBtnWrapperEl, postsWrapperEl);
  } else {
    renderAllPostsList(titleAndBtnWrapperEl, postsWrapperEl);
  }
}
postsInit();

async function renderPostsByUserId(id, titleAndBtnWrapperEl, postsWrapperEl) {
  let user = await getUserByIdEmbedPosts(id);
  let postsListTitle = document.createElement("h2");
  postsListTitle.classList.add("page-title");
  postsListTitle.textContent = `Posts of ${user.name}:`;

  let postsList = document.createElement("ul");
  postsList.classList.add("ul-el");

  user.posts.map((post) => {
    let postItem = document.createElement("li");
    postItem.classList.add("li-el");
    let titleCapitalize = capitalize(post.title);
    postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${titleCapitalize}</a>`;

    postsList.prepend(postItem);
  });
  titleAndBtnWrapperEl.prepend(postsListTitle);
  postsWrapperEl.append(postsList);
}

async function renderAllPostsList(titleAndBtnWrapperEl, postsWrapperEl) {
  let posts = await getAllPostsExpandUser();

  let postsListTitle = document.createElement("h2");
  postsListTitle.classList.add("page-title");
  postsListTitle.textContent = "All Posts: ";

  let postsList = document.createElement("ul");
  postsList.classList.add("ul-el");

  posts.map((post) => {
    let postItem = document.createElement("li");
    postItem.classList.add("li-el");
    let titleCapitalize = capitalize(post.title);
    postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${titleCapitalize} (${post.user.name})</a>`;

    postsList.prepend(postItem);
  });

  titleAndBtnWrapperEl.prepend(postsListTitle);
  postsWrapperEl.append(postsList);
}
