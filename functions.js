function renderListElement(data) {
  let itemEl = document.createElement("li");

  if (data.class) {
    itemEl.classList.add(data.class);
  } else itemEl.classList.add("li-el");

  itemEl.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentEl.append(itemEl);
}

let capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

function renderSingleComment(comment, commentsWrapper) {
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
}
