import { getCommentsByPostId } from "./commentsController.js";
import { renderSingleComment } from "./commentsView.js";

async function commentsInit(postId, postWrapperEl) {
  let comments = await getCommentsByPostId(postId);

  renderSingleComment(comments, postWrapperEl);
}

export { commentsInit };
