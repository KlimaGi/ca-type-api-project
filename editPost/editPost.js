import { headerView } from "../headerView.js";
import { getPostByIdExpandUser } from "../post/postController.js";
import { getAllUsers } from "../users/usersController.js";
import { renderOptionEl } from "../functions.js";
import { editPost } from "./editPostController.js";
import { renderEditedPost } from "./editPostView.js";

async function editPostInit() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get("post_id");

  let post = await getPostByIdExpandUser(postId);
  console.log("post", post);
  let users = await getAllUsers();

  let selectOptions = document.querySelector("#edit-post-user");

  users.map((user) => {
    renderOptionEl({
      content: user.name,
      value: user.id,
      parentEl: selectOptions,
    });
  });

  let postTitleEl = document.querySelector("#edit-post-title");
  postTitleEl.value = post.title;

  let postBodyEl = document.querySelector("#edit-post-body");
  postBodyEl.value = post.body;

  let editPostForm = document.querySelector("#edit-post-form");

  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let { elements } = event.target;

    let titleInput = elements["post-title"].value;
    let bodyInput = elements["post-body"].value;
    let userIdValue = elements["edit-post-user"].value;

    let editPostData = {
      id: postId,
      title: titleInput,
      body: bodyInput,
      userId: userIdValue,
    };
    console.log("editPostData", editPostData);

    let editPostResult = await editPost(editPostData);
    console.log("editPostResult", editPostResult);
    renderEditedPost(editPostResult);

    // event.target.reset();
  });
}

editPostInit();
