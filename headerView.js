function headerView() {
  let bodyEl = document.querySelector("body");
  let headerEl = document.createElement("div");
  headerEl.classList.add("header", "container");

  function currentPage(element) {
    if (element.href.includes(document.location.pathname)) {
      element.classList.add("current-page");
    }
  }

  let HomeEl = document.createElement("a");
  HomeEl.textContent = "Home";
  HomeEl.href = "./index.html";
  currentPage(HomeEl);

  let UsersEl = document.createElement("a");
  UsersEl.textContent = "Users";
  UsersEl.href = "./users.html";
  currentPage(UsersEl);

  let AlbumsEl = document.createElement("a");
  AlbumsEl.textContent = "Albums";
  AlbumsEl.href = "./albums.html";
  currentPage(AlbumsEl);

  let PostsEl = document.createElement("a");
  PostsEl.textContent = "Posts";
  PostsEl.href = "./posts.html";
  currentPage(PostsEl);

  let searchForm = document.createElement("form");
  searchForm.setAttribute("action", "./search.html");

  let searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("name", "search-input");
  searchInput.setAttribute("placeholder", "Search");
  searchInput.classList.add("search-input");

  let searchSubmit = document.createElement("button");
  searchSubmit.setAttribute("type", "submit");
  searchSubmit.classList.add("search-btn");
  searchSubmit.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

  if (document.location.pathname.includes("/search.html")) {
    searchForm.setAttribute("hidden", "");
  }

  searchForm.append(searchInput, searchSubmit);
  headerEl.append(HomeEl, UsersEl, AlbumsEl, PostsEl, searchForm);
  bodyEl.prepend(headerEl);
}

//console.log(document.location.pathname);
// console.log(AlbumsEl.href);
export { headerView };
