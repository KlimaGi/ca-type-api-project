import { capitalize, renderAlbum } from "./functions.js";
import { headerView } from "./headerView.js";
import { commentsInit } from "./comments/comments.js";
import { getAllAlbums } from "./albums/albumsController.js";

headerView();

let postWrapperEl = document.querySelector("#post-wrapper");

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
          postAuthor.innerHTML = `Author: <a class="link" href="./user.html?user_id=${user.id}"> ${user.name}</a>`;
        });

      let commentsBtnEl = document.createElement("button");
      commentsBtnEl.classList.add("btn");

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

            commentsInit(post.id, commentsWrapper);
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

async function renderAllAlbums() {
  let albums = await getAllAlbums();
  albums.map((album) => {
    let albumData = {
      album,
      title: "All albums:",
      userHref: "",
      userFullName: album.user.name,
    };
    renderAlbum(albumData);
  });
}
renderAllAlbums();
