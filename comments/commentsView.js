import { capitalize } from "../functions.js";
import { editComment } from "../editComment/editCommentController.js";

function renderAllComments(comments, postWrapperEl) {
  let commentsWrapper = document.createElement("div");
  commentsWrapper.classList.add("comments-wrapper");
  postWrapperEl.append(commentsWrapper);

  comments.map((comment) => {
    renderSingleComment(comment, ".comments-wrapper");
  });
}

function renderSingleComment(comment, commentsSelector) {
  console.log("comment", comment);
  let { name, email, body, id, postId } = comment;

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
  commentEditBtn.addEventListener("click", async () => {
    let editCommentData = {
      postId: postId,
      id: id,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi",
    };

    let editedComment = await editComment(editCommentData);
    console.log("editedComment", editedComment);
  });

  // commentEditBtn.addEventListener("click", () => {
  //   editComment(data, ".comment-form-wrapper");
  // });

  let commentBody = document.createElement("p");
  commentBody.textContent = capitalize(body);

  commentItem.append(commentTitle, commentEmail, commentBody, commentEditBtn);
  commentsWrapper.append(commentItem);
}

export { renderAllComments, renderSingleComment };

let comment = {
  postId: 1,
  id: 1,
  name: "id labore ex et quam laborum",
  email: "Eliseo@gardner.biz",
  body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
};
