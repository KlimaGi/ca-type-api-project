import { headerView } from "../headerView.js";
import { renderOptionEl } from "../functions.js";
import { createNewPost } from "./createPostController.js";
import { getAllUsers } from "../users/usersController.js";
import { renderCreatedPost } from "./createPostView.js";

async function createPostInit() {
  headerView();

  let users = await getAllUsers();

  let selectOptions = document.querySelector("#create-post-user");

  users.map((user) => {
    renderOptionEl({
      content: user.name,
      value: user.id,
      parentEl: selectOptions,
    });
  });

  let createPostForm = document.querySelector("#create-post-form");

  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let titleInput = event.target.elements["post-title"].value;
    let bodyInput = event.target.elements["post-body"].value;
    let userIdValue = event.target.elements["create-post-user"].value;

    let newPost = {
      title: titleInput,
      body: bodyInput,
      userId: userIdValue,
    };

    let createPost = await createNewPost(newPost);

    renderCreatedPost(createPost);

    event.target.reset();
  });
}
createPostInit();
