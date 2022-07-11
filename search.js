let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get("search-input");

let searchFormPage = document.querySelector("#search-form-page");

let containerEl = document.querySelector("#search-container");
let usersListEl = document.createElement("ul");
usersListEl.classList.add("ul-el");
let searchCommentEl = document.createElement("p");

containerEl.append(searchFormPage, usersListEl);

if (searchPhrase) {
  searchCommentEl.textContent = "";
  usersListEl.append(searchCommentEl);
  millionsFetches();
} else {
  searchCommentEl.textContent = "Enter search a word or phrase ";
  usersListEl.append(searchCommentEl);
}
usersListEl.append(searchResultSubtitleEl);

searchFormPage.addEventListener("submit", (event) => {
  event.preventDefault();
  millionsFetches();
});

function millionsFetches() {
  fetch(
    `https://jsonplaceholder.typicode.com/users?username_like=${searchPhrase}`
  )
    .then((res) => res.json())
    .then((users) => {
      if (users.length > 0) {
        users.map((user) => {
          let userItem = document.createElement("li");
          userItem.classList.add("li-el");
          userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

          let searchResultSubtitleEl = document.createElement("h4");
          searchCommentEl.textContent = "";
          usersListEl.append(searchResultSubtitleEl);
          searchResultSubtitleEl.textContent = "Search result in users: ";
          usersListEl.append(userItem);
        });
      } else {
        fetch(
          `https://jsonplaceholder.typicode.com/users?name_like=${searchPhrase}`
        )
          .then((res) => res.json())
          .then((usersByName) => {
            usersByName.map((user) => {
              console.log(user);
              let userItem = document.createElement("li");
              userItem.classList.add("li-el");
              userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

              let searchResultSubtitleEl = document.createElement("h4");
              searchCommentEl.textContent = "";
              usersListEl.append(searchResultSubtitleEl);
              searchResultSubtitleEl.textContent =
                "Search result in user names: ";

              usersListEl.append(userItem);
            });
          });
      }
    });

  fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${searchPhrase}`)
    .then((res) => res.json())
    .then((posts) => {
      if (posts.length > 0) {
        let searchResultSubtitleEl = document.createElement("h4");
        searchCommentEl.textContent = "";
        usersListEl.append(searchResultSubtitleEl);
        searchResultSubtitleEl.textContent = "Search result in post titles: ";

        posts.map((post) => {
          let postItem = document.createElement("li");
          postItem.classList.add("li-el");
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;

          usersListEl.append(postItem);
        });
      }
    });

  fetch(`https://jsonplaceholder.typicode.com/posts?body_like=${searchPhrase}`)
    .then((res) => res.json())
    .then((postsBody) => {
      if (postsBody.length > 0) {
        let searchResultSubtitleEl = document.createElement("h4");
        searchCommentEl.textContent = "";
        usersListEl.append(searchResultSubtitleEl);
        searchResultSubtitleEl.textContent = "Search result in posts bodies: ";

        postsBody.map((postbody) => {
          let postItem = document.createElement("li");
          postItem.classList.add("li-el");
          postItem.innerHTML = `<a href="./post.html?post_id=${postbody.id}">${postbody.title}</a>`;
          usersListEl.append(postItem);
        });
      }
    });

  fetch(
    `https://jsonplaceholder.typicode.com/albums?title_like=${searchPhrase}`
  )
    .then((res) => res.json())
    .then((albums) => {
      if (albums.length > 0) {
        let searchResultSubtitleEl = document.createElement("h4");
        searchCommentEl.textContent = "";
        usersListEl.append(searchResultSubtitleEl);
        searchResultSubtitleEl.textContent = "Search result in albums titles: ";
        albums.map((album) => {
          fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
            .then((res) => res.json())
            .then((user) => {
              let postItem = document.createElement("li");
              postItem.classList.add("li-el");
              postItem.innerHTML = `<a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`;
              usersListEl.append(postItem);
            });
        });
      }
    });
}
