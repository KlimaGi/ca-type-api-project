let bodyEl = document.querySelector("body");
let headerEl = document.createElement("div");
headerEl.classList.add("header");

let HomeEl = document.createElement("a");
HomeEl.textContent = "Home";
HomeEl.href = "./index.html";

let UsersEl = document.createElement("a");
UsersEl.textContent = "Users";
UsersEl.href = "./users.html";

let AlbumsEl = document.createElement("a");
AlbumsEl.textContent = "Albums";
AlbumsEl.href = "./albums.html";

let PostsEl = document.createElement("a");
PostsEl.textContent = "Posts";
PostsEl.href = "./posts.html";

headerEl.append(HomeEl, UsersEl, AlbumsEl, PostsEl);
bodyEl.prepend(headerEl);

console.log(document.location.pathname);
