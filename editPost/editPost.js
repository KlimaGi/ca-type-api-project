import { headerView } from "../headerView.js";
import { getPostByIdExpandUser } from "../post/postController.js";
import { getAllUsers } from "../users/usersController.js";
import { renderOptionEl } from "../functions.js";

async function editPostInit() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get("post_id");

  let post = await getPostByIdExpandUser(postId);

  let users = await getAllUsers();
  console.log("users", users);
  let selectOptions = document.querySelector("#edit-post-user");

  users.map((user) => {
    renderOptionEl({
      content: user.name,
      value: user.id,
      parentEl: selectOptions,
    });
  });
}

editPostInit();
