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
  let limit = urlParams.get("limit") ? urlParams.get("limit") : 18;
  let page = urlParams.get("page") ? urlParams.get("page") : 1;

  if (userId) {
    let user = await getUserByIdEmbedPosts(userId);
    renderPostsByUserId(user);
  } else {
    let posts = await getAllPostsExpandUser(page, limit);
    renderAllPostsList(posts, limit);
  }
}
postsInit();
