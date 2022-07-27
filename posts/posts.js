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
  let limit = urlParams.get("limit") ? urlParams.get("limit") : 8;
  let page = urlParams.get("page") ? urlParams.get("page") : 1;
  let segment = urlParams.get("segment") ? urlParams.get("segment") : 1;

  if (userId) {
    let posts = await getUserByIdEmbedPosts(userId);
    renderPostsByUserId(posts);
  } else {
    let posts = await getAllPostsExpandUser(page, limit, segment);
    renderAllPostsList(posts, page, limit, segment);
  }
}
postsInit();
