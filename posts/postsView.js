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

async function renderAllPostsList(posts, page, limit) {
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

  renderPaginationLinks(parentSelector, page, limit);
}

function renderPaginationLinks(parentSelector, page, pageLimit) {
  let total = 100;
  let currentPage = Number(page);
  let limit = pageLimit;
  let pages = Math.ceil(total / limit);
  console.log("pages", pages);

  if (pages === 1) return;

  let postsWrapperEl = document.querySelector(parentSelector);
  let paginationWrapperEl = document.createElement("div");
  paginationWrapperEl.classList.add("pagination-wrapper");

  if (currentPage !== 1) {
    let firstPaginationPageItem = document.createElement("a");
    firstPaginationPageItem.href = `./posts.html?page=1&limit=${limit}`;
    firstPaginationPageItem.textContent = "First";
    firstPaginationPageItem.classList.add("pagination-arrow");

    let prevPaginationEl = document.createElement("a");
    prevPaginationEl.href = `./posts.html?page=${
      currentPage - 1
    }&limit=${limit}`;
    prevPaginationEl.textContent = "<";
    prevPaginationEl.classList.add("pagination-arrow");

    paginationWrapperEl.append(firstPaginationPageItem, prevPaginationEl);
  }

  for (let i = 1; i <= pages; i++) {
    let paginationItem;

    if (i === currentPage) {
      paginationItem = document.createElement("span");
      paginationItem.classList.add("current-page");
    } else {
      paginationItem = document.createElement("a");
      paginationItem.href = `./posts.html?page=${i}&limit=${limit}`;
    }

    paginationItem.textContent = i;
    paginationItem.classList.add("pagination-item");
    paginationWrapperEl.append(paginationItem);
  }

  if (currentPage !== pages) {
    let lastPaginationPageItem = document.createElement("a");
    lastPaginationPageItem.href = `./posts.html?page=${pages}&limit=${limit}`;
    lastPaginationPageItem.textContent = "Last";
    lastPaginationPageItem.classList.add("pagination-arrow");

    let nextPaginationEl = document.createElement("a");
    nextPaginationEl.href = `./posts.html?page=${
      currentPage + 1
    }&limit=${limit}`;
    nextPaginationEl.textContent = ">";
    nextPaginationEl.classList.add("pagination-arrow");

    paginationWrapperEl.append(nextPaginationEl, lastPaginationPageItem);
  }

  postsWrapperEl.append(paginationWrapperEl);
}

export { renderPostsByUserId, renderAllPostsList };
