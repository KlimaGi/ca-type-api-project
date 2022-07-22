import { getCommentsByPostId } from "./commentsController.js";
import { renderAllComments } from "./commentsView.js";
import { createCommentInit } from "../createComment/createComment.js";

async function commentsInit(postId, postWrapperEl) {
  let comments = await getCommentsByPostId(postId);

  renderAllComments(comments, postWrapperEl);

  createCommentInit(postWrapperEl, postId);
}

export { commentsInit };
