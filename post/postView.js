import { capitalize, renderSingleComment } from "../functions.js";

function renderPost(post) {
  let postWrapperEl = document.querySelector("#post-wrapper");
  let postItemEl = document.createElement("div");

  postItemEl.classList.add("post-item");
  let postTitle = document.createElement("h3");

  let updatedTitle = capitalize(post.title);

  postTitle.textContent = updatedTitle;
  postTitle.classList.add("title");

  let postAuthor = document.createElement("span");

  let postBody = document.createElement("p");
  postBody.classList.add("post-body");
  let updatedBody = capitalize(post.body);

  postBody.textContent = updatedBody;

  let otherPosts = document.createElement("a");
  otherPosts.textContent = "Other posts";
  otherPosts.classList.add("other-posts");

  otherPosts.setAttribute("href", `./posts.html?user_id=${post.userId}`);

  postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}"> ${post.user.name}</a>`;

  let updatePostDiv = document.createElement("div");
  let updatePostEl = document.createElement("a");
  updatePostEl.textContent = " Edit post";
  updatePostEl.setAttribute("href", "./edit-post.html");
  updatePostDiv.append(updatePostEl);

  let commentsWrapper = document.createElement("div");
  commentsWrapper.classList.add("comments-wrapper");

  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    .then((res) => res.json())
    .then((comments) => {
      comments.map((singleComment) => {
        renderSingleComment(singleComment, commentsWrapper);
      });
    });

  postItemEl.append(
    postTitle,
    postAuthor,
    otherPosts,
    updatePostDiv,
    postBody,
    commentsWrapper
  );
  postWrapperEl.append(postItemEl);
}

export { renderPost };
