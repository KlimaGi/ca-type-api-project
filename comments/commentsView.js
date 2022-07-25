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
  let { name, email, body, id, postId } = comment;

  let commentsWrapper = document.querySelector(commentsSelector);

  let commentItem = document.createElement("div");
  commentItem.classList.add("comment-item");

  let commentTitle = document.createElement("h5");
  commentTitle.textContent = capitalize(name);
  commentTitle.classList.add("title");

  let commentEmail = document.createElement("span");
  commentEmail.textContent = `Comment by: ${email}`;

  let commentBody = document.createElement("p");
  commentBody.textContent = capitalize(body);

  let commentEditBtn = document.createElement("button");
  commentEditBtn.textContent = "Edit";
  commentEditBtn.classList.add("search-btn");

  commentEditBtn.addEventListener("click", () => {
    let commentFormEl = document.createElement("form");
    commentFormEl.setAttribute("id", "edit-comment");
    commentFormEl.classList.add("create-comment");

    let commentTitleForm = document.createElement("input");
    commentTitleForm.setAttribute("name", "comment-title");
    commentTitleForm.setAttribute("placeholder", "Your comment name");
    commentTitleForm.classList.add("comment-input", "wide-input");
    commentTitleForm.value = name;

    let commentEmailForm = document.createElement("input");
    commentEmailForm.setAttribute("name", "comment-email");
    commentEmailForm.setAttribute("placeholder", "Your email");
    commentEmailForm.classList.add("comment-input", "wide-input");
    commentEmailForm.value = email;

    let commentBodyForm = document.createElement("textarea");
    commentBodyForm.setAttribute("name", "comment-body");
    commentBodyForm.setAttribute("placeholder", "Your comment ...");
    commentBodyForm.setAttribute("rows", "6");
    commentBodyForm.classList.add("comment-input", "wide-input");
    commentBodyForm.value = body;

    let submitEditCommentBtnEl = document.createElement("button");
    submitEditCommentBtnEl.textContent = "Submit edited comment";
    submitEditCommentBtnEl.setAttribute("type", "submit");
    submitEditCommentBtnEl.classList.add("btn");

    commentFormEl.append(
      commentTitleForm,
      commentEmailForm,
      commentBodyForm,
      submitEditCommentBtnEl
    );
    commentItem.append(commentFormEl);

    commentFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      let { elements } = event.target;
      let titleEdited = elements["comment-title"].value;
      let emailEdited = elements["comment-email"].value;
      let bodyEdited = elements["comment-body"].value;

      let editedCommentData = {
        postId: Number(postId),
        id,
        name: titleEdited,
        email: emailEdited,
        body: bodyEdited,
      };

      console.log("editedCommentData", editedCommentData);

      let editedCommentRes = await editComment(editedCommentData);
      console.log("editedCommentRes", editedCommentRes);

      let { name: resName, email: resEmail, body: resBody } = editedCommentRes;
      commentTitle.textContent = capitalize(resName);
      commentEmail.textContent = `Comment by: ${resEmail}`;
      commentBody.textContent = capitalize(resBody);

      commentFormEl.remove();
    });
  });

  // commentEditBtn.addEventListener("click", () => {
  //   editComment(data, ".comment-form-wrapper");
  // });

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
