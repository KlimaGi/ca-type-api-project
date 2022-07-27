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

async function renderAllPostsList(posts, page, limit, segment) {
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

  renderPaginationLinks(parentSelector, page, limit, segment);
}

function renderPaginationLinks(parentSelector, page, limit, segment) {
  //pages
  let total = 100;
  let currentPage = Number(page);
  let pages = Math.ceil(total / limit);

  //segments
  let pagesInSegment = 7;
  let segmentsCount = Math.ceil(pages / pagesInSegment);
  let currentSegment = Number(segment);
  let firstPageInSegment = (currentSegment - 1) * pagesInSegment + 1;
  let segmentFromPage = Math.ceil(currentPage / pagesInSegment);
  let lastPageInSegment;
  if (currentSegment < segmentsCount) {
    lastPageInSegment = pagesInSegment * currentSegment;
  } else {
    lastPageInSegment = pages;
  }

  if (total <= limit) return;

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

  for (let i = firstPageInSegment; i <= lastPageInSegment; i++) {
    let paginationItem;

    if (i === currentPage) {
      paginationItem = document.createElement("span");
      paginationItem.classList.add("current-page");
    } else {
      paginationItem = document.createElement("a");
      paginationItem.href = `./posts.html?page=${i}&limit=${limit}&segment=${segmentFromPage}`;
    }

    paginationItem.textContent = i;
    paginationItem.classList.add("pagination-item");
    paginationWrapperEl.append(paginationItem);
  }

  if (currentPage !== pages) {
    let lastPaginationPageItem = document.createElement("a");
    lastPaginationPageItem.href = `./posts.html?page=${pages}&limit=${limit}&segment=${currentSegment}`;
    lastPaginationPageItem.textContent = "Last";
    lastPaginationPageItem.classList.add("pagination-arrow");

    let nextPaginationEl = document.createElement("a");
    let segmentFromPage = Math.ceil((currentPage + 1) / pagesInSegment);
    nextPaginationEl.href = `./posts.html?page=${
      currentPage + 1
    }&limit=${limit}&segment=${segmentFromPage}`;
    nextPaginationEl.textContent = ">";
    nextPaginationEl.classList.add("pagination-arrow");

    let nextSegmentEl = document.createElement("a");
    if (currentSegment !== segmentsCount) {
      nextSegmentEl.href = `./posts.html?page=${
        firstPageInSegment + pagesInSegment
      }&limit=${limit}&segment=${currentSegment + 1}`;
      nextSegmentEl.textContent = ">>";
      nextSegmentEl.classList.add("pagination-arrow");
    }

    paginationWrapperEl.append(
      nextPaginationEl,
      nextSegmentEl,
      lastPaginationPageItem
    );
  }

  postsWrapperEl.append(paginationWrapperEl);
}

export { renderPostsByUserId, renderAllPostsList };
