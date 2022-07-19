import { headerView } from "./headerView.js";
import { capitalize } from "./functions.js";

headerView();

async function getUsers() {
  let res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await res.json();
  return users;
}

let users = await getUsers();
let usersData = users.map((user) => {
  return { userId: user.id, userName: user.name };
});
console.log("usersData", usersData);

let userIdByName = (name) => usersData.find((item) => item.userName === name);
let userNameById = (id) => usersData.find((item) => item.userId === Number(id));

console.log("userIdByName", userIdByName("Patricia Lebsack"));
console.log("userNameById", userNameById(3));

let selectOptions = document.querySelector("#create-post-user");
usersData.map((user) => {
  let optionEl = document.createElement("option");
  optionEl.textContent = `-- ${user.userName}`;
  optionEl.setAttribute("id", `${user.userId}`);
  optionEl.setAttribute("name", "user-id-option");
  selectOptions.append(optionEl);
});

let createPostForm = document.querySelector("#create-post-form");

createPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let titleInput = event.target.elements["post-title"].value;

  let bodyInput = event.target.elements["post-body"].value;

  let userNameValue = event.target.elements["create-post-user"].value;
  console.log("userName", userNameValue);
  // ---------------------------
  let userIdNumber = userIdByName(userNameValue);
  console.log("userIdNumber", userIdNumber);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: titleInput,
      body: bodyInput,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("json", json);
      renderCreatedPost(json);
    });
});

function renderCreatedPost(data) {
  let { title, body, userId } = data;

  let author = userNameById(userId);
  console.log("author", author);

  let newPostEl = document.querySelector("#new-post");
  let postTitleEl = document.createElement("h3");
  postTitleEl.classList.add("page-title");

  postTitleEl.textContent = capitalize(title);

  let postBodyEl = document.createElement("p");

  postBodyEl.textContent = capitalize(body);

  let postAuthorEl = document.createElement("p");

  postAuthorEl.textContent = "Author is: " + author.userName;

  newPostEl.append(postTitleEl, postBodyEl, postAuthorEl);
}

renderCreatedPost();
