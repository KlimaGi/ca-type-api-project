let mainEl = document.querySelector("#main");
let postWrapperEl = document.createElement("div");

mainEl.append(postWrapperEl);

fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=15`)
  .then((res) => res.json())
  .then((data) => {
    data.map((post) => {
      // let updatedTitle = post.title.charAt[0];

      let postItemEl = document.createElement("div");
      postItemEl.classList.add("post-item");
      let postTitle = document.createElement("h3");
      postTitle.textContent = post.title;
      postTitle.classList.add("title");

      let author = document.createElement("a");
      author.href = "#";

      let postBody = document.createElement("p");
      postBody.textContent = post.body;

      console.log(post);

      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then((res) => res.json())
        .then((user) => {
          author.textContent = user.name;
        });

      let commentsWrapper = document.createElement("div");
      commentsWrapper.classList.add("comments-wrapper");
      commentsWrapper.setAttribute("hidden", "");

      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
        .then((res) => res.json())
        .then((comments) => {
          console.log(comments);
          comments.map((comment) => {
            let commentItem = document.createElement("div");
            commentItem.classList.add("comment-item");
            let commentTitle = document.createElement("h5");
            commentTitle.textContent = comment.name;
            commentTitle.classList.add("title");

            let commentEmail = document.createElement("span");
            commentEmail.textContent = comment.email;

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
        author,
        postBody,
        commentsBtnEl,
        commentsWrapper
      );
      postWrapperEl.append(postItemEl);
    });
  });
