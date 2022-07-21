import { capitalize } from "../functions.js";
import { commentsInit } from "../comments/comments.js";

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

  postBody.textContent = capitalize(post.body);

  let otherPosts = document.createElement("a");
  otherPosts.textContent = "Other posts";
  otherPosts.classList.add("other-posts");

  otherPosts.setAttribute("href", `./posts.html?user_id=${post.userId}`);

  postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${post.user.id}"> ${post.user.name}</a>`;

  let updatePostDiv = document.createElement("div");
  let updatePostEl = document.createElement("a");
  updatePostEl.textContent = "Edit post";
  updatePostEl.setAttribute("href", "./edit-post.html");
  updatePostEl.classList.add("link-btn");
  updatePostDiv.append(updatePostEl);

  commentsInit(post.id, postWrapperEl);

  postItemEl.append(postTitle, postAuthor, otherPosts, postBody, updatePostDiv);
  postWrapperEl.append(postItemEl);
}

export { renderPost };
