import { headerView } from "./headerView.js";

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

console.log("userIdByName", userIdByName("Patricia Lebsack"));

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
  let title = event.target.elements["post-title"].value;

  let body = event.target.elements["post-body"].value;

  let userNameValue = event.target.elements["create-post-user"].value;
  console.log("userName", userNameValue);
  let userIdNumber = userIdByName(userNameValue);
  console.log("userIdNumber", userIdNumber);
});
