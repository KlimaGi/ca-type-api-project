import { renderListElement } from "../functions.js";

function usersList(users) {
  let usersWrapper = document.querySelector("#users-wrapper");

  let titleAndBtnWrapperEl = document.createElement("div");
  titleAndBtnWrapperEl.classList.add("title-btn-wrapper");

  let postsListTitle = document.createElement("h2");
  postsListTitle.classList.add("page-title");
  postsListTitle.textContent = "Users";

  let createPostBtnEl = document.createElement("a");
  createPostBtnEl.textContent = "Create User";
  createPostBtnEl.classList.add("link-btn");
  createPostBtnEl.setAttribute("href", "./create-user.html");

  let usersList = document.createElement("ul");
  usersList.classList.add("ul-el");

  titleAndBtnWrapperEl.append(postsListTitle, createPostBtnEl);
  usersWrapper.append(titleAndBtnWrapperEl, usersList);

  users.map((user) => {
    let postCount = user.posts.length;
    let pluralS = postCount > 1 ? "s" : "";

    let userData = {
      content: `${user.name} (${postCount} post${pluralS})`,
      href: `./user.html?user_id=${user.id}`,
      parentEl: usersList,
    };
    renderListElement(userData);
  });
}

export { usersList };
