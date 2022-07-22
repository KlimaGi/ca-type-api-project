import { capitalize } from "../functions.js";

function renderAllComments(comments, postWrapperEl) {
  let commentsWrapper = document.createElement("div");
  commentsWrapper.classList.add("comments-wrapper");
  postWrapperEl.append(commentsWrapper);

  comments.map((comment) => {
    renderSingleComment(comment, ".comments-wrapper");
  });
}

function renderSingleComment(comment, commentsSelector) {
  let { name, email, body } = comment;

  let commentsWrapper = document.querySelector(commentsSelector);

  let commentItem = document.createElement("div");
  commentItem.classList.add("comment-item");

  let commentTitle = document.createElement("h5");
  commentTitle.textContent = capitalize(name);
  commentTitle.classList.add("title");

  let commentEmail = document.createElement("span");
  commentEmail.textContent = `Comment by: ${email}`;

  let commentEditBtn = document.createElement("button");
  commentEditBtn.textContent = "Edit";
  commentEditBtn.classList.add("search-btn");

  commentEditBtn.addEventListener("click", () => {
    editComment(data, ".comment-form-wrapper");
  });

  let commentBody = document.createElement("p");
  commentBody.textContent = capitalize(body);

  commentItem.append(commentTitle, commentEmail, commentBody, commentEditBtn);
  commentsWrapper.append(commentItem);
}

export { renderAllComments, renderSingleComment };
