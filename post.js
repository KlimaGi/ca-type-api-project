let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get("post_id");

let postWrapperEl = document.querySelector("#post-wrapper");

let capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

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
    let updatedBody = capitalize(post.body);
    postBody.textContent = updatedBody;

    let otherPosts = document.createElement("a");
    otherPosts.textContent = "Other posts";
    console.log(post);

    otherPosts.setAttribute("href", `./posts.html?user_id=${post.userId}`);

    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((res) => res.json())
      .then((user) => {
        postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${user.id}"> ${user.name}</a>`;
        //console.log("--", user);
      });

    let commentsWrapper = document.createElement("div");
    commentsWrapper.classList.add("comments-wrapper");
    commentsWrapper.setAttribute("hidden", "");

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then((comments) => {
        comments.map((comment) => {
          let commentItem = document.createElement("div");
          commentItem.classList.add("comment-item");
          let commentTitle = document.createElement("h5");
          commentTitle.textContent = comment.name;
          commentTitle.classList.add("title");

          let commentEmail = document.createElement("span");
          commentEmail.textContent = `Comment by: ${comment.email}`;

          let commentBody = document.createElement("p");
          commentBody.textContent = comment.body;

          commentItem.append(commentTitle, commentEmail, commentBody);
          commentsWrapper.append(commentItem);
        });
      });

    let commentsBtnEl = document.createElement("button");
    commentsBtnEl.textContent = "Show comments";
    commentsBtnEl.classList.add("btn-show-comment");

    commentsBtnEl.addEventListener("click", () => {
      let btnText =
        commentsBtnEl.textContent === "Show comments"
          ? "Hide Comments"
          : "Show comments";
      commentsBtnEl.textContent = btnText;
      commentsWrapper.toggleAttribute("hidden");
    });

    postItemEl.append(
      postTitle,
      postAuthor,
      postBody,
      otherPosts,
      commentsBtnEl,
      commentsWrapper
    );
    postWrapperEl.append(postItemEl);
  });
