let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get("search-input");

console.log(queryParams);

let searchFormPage = document.createElement("form");
searchFormPage.setAttribute("action", "./search.html");

let searchInputPage = document.createElement("input");
searchInputPage.setAttribute("type", "text");
searchInputPage.setAttribute("name", "search-input");
searchInputPage.setAttribute("placeholder", "Search");
searchInputPage.classList.add("search-input");

let searchSubmitPage = document.createElement("button");
searchSubmitPage.setAttribute("type", "submit");
searchSubmitPage.classList.add("search-btn");
searchSubmitPage.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

searchFormPage.append(searchInputPage, searchSubmitPage);
let containerEl = document.querySelector("#search-container");
containerEl.append(searchFormPage);

let usersListEl = document.createElement("ul");
usersListEl.classList.add("ul-el");
containerEl.append(usersListEl);

fetch(
  `https://jsonplaceholder.typicode.com/users?username_like=${searchPhrase}`
)
  .then((res) => res.json())
  .then((users) => {
    console.log("user", users);

    if (users.length > 0) {
      users.map((user) => {
        console.log(user);
        let userItem = document.createElement("li");
        userItem.classList.add("li-el");
        userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

        let searchResultSubtitleEl = document.createElement("p");
        searchResultSubtitleEl.textContent = "";
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
          console.log("usersByName", usersByName);
          usersByName.map((user) => {
            console.log(user);
            let userItem = document.createElement("li");
            userItem.classList.add("li-el");
            userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;

            let searchResultSubtitleEl = document.createElement("p");
            searchResultSubtitleEl.textContent = "";
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
    console.log("posts", posts);

    if (posts.length > 0) {
      let searchResultSubtitleEl = document.createElement("p");
      searchResultSubtitleEl.textContent = "";
      usersListEl.append(searchResultSubtitleEl);
      searchResultSubtitleEl.textContent = "Search result in post titles: ";

      posts.map((post) => {
        console.log("post", post);
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
    console.log("postsBody", postsBody);

    if (postsBody.length > 0) {
      let searchResultSubtitleEl = document.createElement("p");
      searchResultSubtitleEl.textContent = "";
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
