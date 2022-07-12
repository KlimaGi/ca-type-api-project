let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get("search-input");

let searchFormPage = document.querySelector("#search-form-page");

let containerEl = document.querySelector("#search-container");
let usersListEl = document.createElement("ul");
usersListEl.classList.add("ul-el");
let searchCommentEl = document.createElement("p");
containerEl.append(searchFormPage, usersListEl);

init(searchPhrase);

function init(searchPhrase) {
  if (searchPhrase) {
    searchCommentEl.textContent = "";
    usersListEl.append(searchCommentEl);
    millionsFetches(searchPhrase);
  } else {
    searchCommentEl.textContent = "Enter search a word or phrase ";
    usersListEl.append(searchCommentEl);
  }
}

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
          let userItem = document.createElement("li");
          userItem.classList.add("li-el");
          userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;
          searchResultSubtitleEl.textContent = "Search result in users: ";
          usersListEl.append(userItem);
        });
      } else {
        fetch(`https://jsonplaceholder.typicode.com/users?name_like=${word}`)
          .then((res) => res.json())
          .then((usersByName) => {
            if (usersByName.length > 0) {
              usersByName.map((user) => {
                let userItem = document.createElement("li");
                userItem.classList.add("li-el");
                userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

                searchResultSubtitleEl.textContent =
                  "Search result in user names: ";

                usersListEl.append(userItem);
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
          let postItem = document.createElement("li");
          postItem.classList.add("li-el");
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;

          usersListEl.append(postItem);
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
          let postItem = document.createElement("li");
          postItem.classList.add("li-el");
          postItem.innerHTML = `<a href="./post.html?post_id=${postbody.id}">${postbody.title}</a>`;
          usersListEl.append(postItem);
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
              let postItem = document.createElement("li");
              postItem.classList.add("li-el");
              postItem.innerHTML = `<a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`;
              usersListEl.append(postItem);
            });
        });
      } else {
        searchResultSubtitleEl.textContent = "";
      }
    });
}

function renderListElement(list) {}
