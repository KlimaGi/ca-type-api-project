import { headerView } from "../headerView.js";
import { getPostByUserId } from "./postController.js";
import { renderPost } from "./postView.js";

async function postInit() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let postId = urlParams.get("post_id");

  let post = await getPostByUserId(postId);

  renderPost(post);
}

postInit();
