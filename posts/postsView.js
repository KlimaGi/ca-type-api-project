import { capitalize } from "../functions.js";

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

function renderAllPostsList(posts, limit) {
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
  renderPaginationLinks(parentSelector, limit);
}

function renderPaginationLinks(parentSelector, pageLimit) {
  let total = 100;
  let limit = pageLimit;
  let pages = Math.ceil(total / limit);

  let postsWrapperEl = document.querySelector(parentSelector);
  let paginationEl = document.createElement("div");

  for (let i = 1; i <= pages; i++) {
    let pageNumEl = document.createElement("a");
    pageNumEl.href = `./posts.html?page=${i}&limit=${limit}`;
    pageNumEl.textContent = i;
    paginationEl.append(pageNumEl);
  }

  postsWrapperEl.append(paginationEl);
}

export { renderPostsByUserId, renderAllPostsList };
