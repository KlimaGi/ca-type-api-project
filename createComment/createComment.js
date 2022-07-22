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
  commentBody.classList.add("comment-input", "wide-input");

  let createCommentBtnEl = document.createElement("button");
  createCommentBtnEl.textContent = "Submit";
  createCommentBtnEl.setAttribute("type", "submit");
  createCommentBtnEl.classList.add("btn");

  commentFormEl.append(commentTitle, commentBody, createCommentBtnEl);
  postWrapperEl.append(commentFormEl);

  commentFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    let { elements } = event.target;
    let title = elements["comment-title"].value;
    let email = elements["comment-email"].value;
    let body = elements["comment-body"].value;

    console.log("title", title);
    console.log("body", body);

    let newComment = {
      postId,
      id: 1,
      name: title,
      email,
      body,
    };
  });
}

export { createCommentInit };

let comment = {
  postId: 1,
  id: 1,
  name: "id labore ex et quam laborum",
  email: "Eliseo@gardner.biz",
  body: "laudantium enim quasi est quidem m",
};
