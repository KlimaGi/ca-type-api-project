import { getCommentsByPostId } from "./commentsController.js";
import { renderSingleComment } from "./commentsView.js";
import { createCommentInit } from "../createComment/createComment.js";

async function commentsInit(postId, postWrapperEl) {
  let comments = await getCommentsByPostId(postId);

  renderSingleComment(comments, postWrapperEl);

  createCommentInit(postWrapperEl, postId);
}

export { commentsInit };
