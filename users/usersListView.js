import { renderListElement } from "../functions.js";

function usersList(users) {
  let usersWrapper = document.querySelector("#users-wrapper");
  let usersList = document.createElement("ul");
  usersList.classList.add("ul-el");

  usersWrapper.append(usersList);

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
