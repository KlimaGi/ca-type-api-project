import { getUserById } from "../user/userController.js";
import { capitalize } from "../functions.js";

async function renderEditedPost(data) {
  let { title, body, userId, id } = data;

  let user = await getUserById(userId);

  let editPostEl = document.querySelector("#edit-post");
  let postTitleEl = document.createElement("h3");
  postTitleEl.classList.add("page-title");
  postTitleEl.innerHTML = `${capitalize(
    title
  )}  <span class="new-post-id">(id: ${id})</span>`;

  let postBodyEl = document.createElement("p");
  postBodyEl.textContent = capitalize(body);

  let postAuthorEl = document.createElement("p");
  postAuthorEl.textContent = "Author is: " + user.name;

  editPostEl.append(postTitleEl, postBodyEl, postAuthorEl);
}

export { renderEditedPost };
