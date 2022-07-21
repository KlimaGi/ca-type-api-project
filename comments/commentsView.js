import { capitalize } from "../functions.js";

function renderSingleComment(comments, postWrapperEl) {
  let commentsWrapper = document.createElement("div");
  commentsWrapper.classList.add("comments-wrapper");

  comments.map((comment) => {
    let commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");

    let commentTitle = document.createElement("h5");
    commentTitle.textContent = capitalize(comment.name);
    commentTitle.classList.add("title");

    let commentEmail = document.createElement("span");
    commentEmail.textContent = `Comment by: ${comment.email}`;

    let commentBody = document.createElement("p");
    commentBody.textContent = comment.body;

    commentItem.append(commentTitle, commentEmail, commentBody);
    commentsWrapper.append(commentItem);
  });
  postWrapperEl.append(commentsWrapper);
}

export { renderSingleComment };
