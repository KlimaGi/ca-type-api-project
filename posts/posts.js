import { capitalize } from "../functions.js";
import { headerView } from "../headerView.js";
import {
  getUserByIdEmbedPosts,
  getAllPostsExpandUser,
} from "./postsController.js";
import { renderPostsByUserId, renderAllPostsList } from "./postsView.js";

async function postsInit() {
  headerView();

  let queryParams = document.location.search;
  let urlParams = new URLSearchParams(queryParams);
  let userId = urlParams.get("user_id");

  if (userId) {
    let user = await getUserByIdEmbedPosts(userId);
    renderPostsByUserId(user);
  } else {
    let posts = await getAllPostsExpandUser();
    renderAllPostsList(posts);
  }
}
postsInit();
