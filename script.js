let postWrapperEl = document.querySelector("#post-wrapper");
let albumsWrapperEl = document.querySelector("#albums-wrapper");

fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=15`)
  .then((res) => res.json())
  .then((data) => {
    data.map((post) => {
      let postItemEl = document.createElement("div");
      postItemEl.classList.add("post-item");
      let postTitle = document.createElement("h3");

      let updatedTitle = capitalize(post.title);

      postTitle.textContent = updatedTitle;
      postTitle.classList.add("title");

      let postAuthor = document.createElement("h4");

      let postBody = document.createElement("p");
      postBody.classList.add("post-body");
      let updatedBody = capitalize(post.body);
      postBody.textContent = updatedBody;

      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then((res) => res.json())
        .then((user) => {
          postAuthor.innerHTML = `Author: <a href="./user.html?user_id=${user.id}"> ${user.name}</a>`;
        });

      let commentsBtnEl = document.createElement("button");
      commentsBtnEl.classList.add("btn-show-comment");

      commentsBtnEl.addEventListener("click", buttonText);

      function buttonText() {
        let btnTextIs = commentsBtnEl.textContent;
        if (btnTextIs === "Show comment" || btnTextIs === "Hide comment") {
          let btnText =
            btnTextIs === "Show comment" ? "Hide comment" : "Show comment";
          commentsBtnEl.textContent = btnText;
        } else {
          let btnText =
            btnTextIs === "Show comments" ? "Hide comments" : "Show comments";
          commentsBtnEl.textContent = btnText;
        }

        commentsWrapper.toggleAttribute("hidden");
      }

      let commentsWrapper = document.createElement("div");
      commentsWrapper.classList.add("comments-wrapper");
      commentsWrapper.setAttribute("hidden", "");

      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
        .then((res) => res.json())
        .then((comments) => {
          if (comments.length === 0) {
            commentsBtnEl.setAttribute("hidden", "");
          } else if (comments.length === 1) {
            commentsBtnEl.textContent = "Show comment";
          } else {
            commentsBtnEl.textContent = "Show comments";

            comments.map((singleComment) => {
              renderSingleComment(singleComment, commentsWrapper);
            });
          }
        });

      postItemEl.append(
        postTitle,
        postAuthor,
        postBody,
        commentsBtnEl,
        commentsWrapper
      );
      postWrapperEl.append(postItemEl);
    });
  });

fetch(`https://jsonplaceholder.typicode.com/albums?_limit=15`)
  .then((res) => res.json())
  .then((albums) => {
    albums.map((album) => {
      fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then((res) => res.json())
        .then((user) => {
          fetch(
            `https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`
          )
            .then((res) => res.json())
            .then((photos) => {
              let albumItem = document.createElement("div");
              albumItem.classList.add("album-item");

              let albumTitle = document.createElement("h4");
              let capitalizeTitle = capitalize(album.title);
              albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${capitalizeTitle}</a>`;

              let albumAuthor = document.createElement("span");
              albumAuthor.textContent = `Album created by: ${user.name}`;

              let imgEl = document.createElement("img");
              imgEl.src = `${photos[0].thumbnailUrl}`;

              albumItem.append(imgEl, albumTitle, albumAuthor);
              albumsWrapperEl.prepend(albumItem);
            });
        });
    });
  });
