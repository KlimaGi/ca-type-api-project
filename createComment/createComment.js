import { createNewComment } from "./createCommentController.js";
import { renderSingleComment } from "../comments/commentsView.js";

function createCommentInit(postWrapperEl, postId) {
  let commentFormEl = document.createElement("form");
  commentFormEl.setAttribute("id", "create-comment");
  commentFormEl.classList.add("create-comment");

  let commentTitle = document.createElement("input");
  commentTitle.setAttribute("name", "comment-title");
  commentTitle.setAttribute("placeholder", "Your comment title...");
  commentTitle.classList.add("comment-input", "wide-input");

  let commentEmail = document.createElement("input");
  commentEmail.setAttribute("name", "comment-email");
  commentEmail.setAttribute("placeholder", "Your email");
  commentEmail.classList.add("comment-input", "wide-input");

  let commentBody = document.createElement("textarea");
  commentBody.setAttribute("name", "comment-body");
  commentBody.setAttribute("placeholder", "Your comment ...");
  commentBody.setAttribute("rows", "3");
  commentBody.classList.add("comment-input", "wide-input");

  let createCommentBtnEl = document.createElement("button");
  createCommentBtnEl.textContent = "Submit";
  createCommentBtnEl.setAttribute("type", "submit");
  createCommentBtnEl.classList.add("btn");

  commentFormEl.append(
    commentTitle,
    commentEmail,
    commentBody,
    createCommentBtnEl
  );
  postWrapperEl.append(commentFormEl);

  commentFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { elements } = event.target;
    let title = elements["comment-title"].value;
    let email = elements["comment-email"].value;
    let body = elements["comment-body"].value;

    let newComment = {
      postId: Number(postId),
      id: 1,
      name: title,
      email,
      body,
    };

    let createComment = await createNewComment(newComment);

    renderSingleComment(createComment, ".comments-wrapper");
  });
}

export { createCommentInit };
