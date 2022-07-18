import { capitalize, renderSingleComment } from "./functions.js";

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get("post_id");

let postWrapperEl = document.querySelector("#post-wrapper");

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then((res) => res.json())
  .then((post) => {
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

    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((res) => res.json())
      .then((user) => {
        postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${user.id}"> ${user.name}</a>`;
      });

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
      postBody,
      commentsWrapper
    );
    postWrapperEl.append(postItemEl);
  });
