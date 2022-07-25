import { capitalize } from "../functions.js";
import { editComment } from "../editComment/editCommentController.js";
import { editCommentFormView } from "../editComment/editCommentView.js";

function renderAllComments(comments, postWrapperEl) {
  let commentsWrapper = document.createElement("div");
  commentsWrapper.classList.add("comments-wrapper");
  postWrapperEl.append(commentsWrapper);

  comments.map((comment) => {
    renderSingleComment(comment, ".comments-wrapper");
  });
}

function renderSingleComment(comment, commentsSelector) {
  let { name, email, body, id, postId } = comment;

  let commentsWrapper = document.querySelector(commentsSelector);

  let commentItem = document.createElement("div");
  commentItem.classList.add("comment-item");

  let commentTitle = document.createElement("h5");
  commentTitle.textContent = capitalize(name);
  commentTitle.classList.add("title");
  commentTitle.setAttribute("id", `title-${id}`);

  let commentEmail = document.createElement("span");
  commentEmail.textContent = `Comment by: ${email}`;
  commentEmail.setAttribute("id", `email-${id}`);

  let commentBody = document.createElement("p");
  commentBody.textContent = capitalize(body);
  commentBody.setAttribute("id", `body-${id}`);

  let commentEditBtn = document.createElement("button");
  commentEditBtn.textContent = "Edit comment";
  commentEditBtn.classList.add("search-btn");

  commentEditBtn.addEventListener("click", () => {
    let editCommentData = { name, email, body, postId: Number(postId), id };
    let commentSelectors = {
      titleId: `#title-${id}`,
      emailId: `#email-${id}`,
      bodyId: `#body-${id}`,
      parentSelector: ".comment-item",
    };

    editCommentFormView(editCommentData, commentSelectors);
  });

  commentItem.append(commentTitle, commentEmail, commentBody, commentEditBtn);
  commentsWrapper.append(commentItem);
}

export { renderAllComments, renderSingleComment };
