import { renderListElement } from "./functions.js";
import { headerView } from "./headerView.js";

headerView();

let searchFormPage = document.querySelector("#search-form-page");
let containerEl = document.querySelector("#search-container");
let usersListEl = document.createElement("ul");
usersListEl.classList.add("ul-el");
let searchCommentEl = document.createElement("p");
containerEl.append(searchFormPage, usersListEl);

function init() {
  outerSearch();

  innerSearchForm();
}

function outerSearch() {
  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let searchPhrase = urlParams.get("search-input");

  if (searchPhrase) {
    searchCommentEl.textContent = "";
    usersListEl.append(searchCommentEl);
    millionsFetches(searchPhrase);
  } else {
    searchCommentEl.textContent = "Enter a search word or phrase ";
    usersListEl.append(searchCommentEl);
  }
}

function innerSearchForm() {
  let searchFormPage = document.querySelector("#search-form-page");
  searchFormPage.addEventListener("submit", (event) => {
    event.preventDefault();
    usersListEl.innerHTML = "";
    let searchWord = event.target.elements["search-input"].value;
    if (searchWord) millionsFetches(searchWord);
    else {
      searchCommentEl.textContent = "Enter search a word or phrase ";
      usersListEl.append(searchCommentEl);
    }
  });
}

function millionsFetches(word) {
  searchCommentEl.textContent = "";

  renderAllUsers(word);

  renderAllPosts(word);

  renderAllAlbums(word);
}

function renderAllUsers(word) {
  fetch(`https://jsonplaceholder.typicode.com/users?username_like=${word}`)
    .then((res) => res.json())
    .then((users) => {
      let searchResultSubtitleEl = document.createElement("h4");
      searchResultSubtitleEl.textContent = "";
      usersListEl.append(searchResultSubtitleEl);

      if (users.length > 0) {
        users.map((user) => {
          let userData = {
            content: user.name,
            href: `./user.html?user_id=${user.id}`,
            parentEl: usersListEl,
          };
          renderListElement(userData);
        });
      } else {
        fetch(`https://jsonplaceholder.typicode.com/users?name_like=${word}`)
          .then((res) => res.json())
          .then((usersByName) => {
            if (usersByName.length > 0) {
              usersByName.map((user) => {
                searchResultSubtitleEl.textContent =
                  "Search result in user names: ";

                let userData = {
                  content: user.name,
                  href: `./user.html?user_id=${user.id}`,
                  parentEl: usersListEl,
                };
                renderListElement(userData);
              });
            } else {
              searchResultSubtitleEl.textContent = "";
            }
          });
      }
    });
}

function renderAllPosts(word) {
  fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${word}`)
    .then((res) => res.json())
    .then((posts) => {
      let searchResultSubtitleEl = document.createElement("h4");
      searchResultSubtitleEl.textContent = "";
      usersListEl.append(searchResultSubtitleEl);

      if (posts.length > 0) {
        searchResultSubtitleEl.textContent = "Search result in posts titles: ";

        posts.map((post) => {
          let postData = {
            content: post.title,
            href: `./post.html?post_id=${post.id}`,
            parentEl: usersListEl,
          };
          renderListElement(postData);
        });
      } else {
        searchResultSubtitleEl.textContent = "";
      }
    });

  fetch(`https://jsonplaceholder.typicode.com/posts?body_like=${word}`)
    .then((res) => res.json())
    .then((postsBody) => {
      let searchResultSubtitleEl = document.createElement("h4");
      searchResultSubtitleEl.textContent = "";
      usersListEl.append(searchResultSubtitleEl);
      if (postsBody.length > 0) {
        searchResultSubtitleEl.textContent = "Search result in posts bodies: ";

        postsBody.map((postbody) => {
          let postData = {
            content: postbody.title,
            href: `./post.html?post_id=${postbody.id}`,
            parentEl: usersListEl,
          };
          renderListElement(postData);
        });
      } else {
        searchResultSubtitleEl.textContent = "";
      }
    });
}

function renderAllAlbums(word) {
  fetch(`https://jsonplaceholder.typicode.com/albums?title_like=${word}`)
    .then((res) => res.json())
    .then((albums) => {
      let searchResultSubtitleEl = document.createElement("h4");
      searchResultSubtitleEl.textContent = "";
      usersListEl.append(searchResultSubtitleEl);

      if (albums.length > 0) {
        albums.map((album) => {
          searchResultSubtitleEl.textContent =
            "Search result in albums titles: ";
          fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
            .then((res) => res.json())
            .then((user) => {
              let albumData = {
                content: album.title,
                href: `./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}`,
                parentEl: usersListEl,
              };
              renderListElement(albumData);
            });
        });
      } else {
        searchResultSubtitleEl.textContent = "";
      }
    });
}

init();
