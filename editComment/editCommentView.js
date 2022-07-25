import { capitalize } from "../functions.js";
import { editComment } from "./editCommentController.js";

function editCommentFormView(editCommentData, commentSelectors) {
  let { name, email, body, postId, id } = editCommentData;
  let { titleId, emailId, bodyId, parentSelector } = commentSelectors;

  let newCommentTitleEl = document.querySelector(titleId);
  let newCommentEmailEl = document.querySelector(emailId);
  let newCommentBodyEl = document.querySelector(bodyId);

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

  let commentItem = document.querySelector(parentSelector);
  //console.dir(commentItem.children.length);
  if (commentItem.children.length < 5) commentItem.append(commentFormEl);

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

    let editedCommentRes = await editComment(editedCommentData);

    let { name: resName, email: resEmail, body: resBody } = editedCommentRes;
    newCommentTitleEl.textContent = capitalize(resName);
    newCommentEmailEl.textContent = `Comment by: ${resEmail}`;
    newCommentBodyEl.textContent = capitalize(resBody);

    commentFormEl.remove();
  });
}

export { editCommentFormView };
