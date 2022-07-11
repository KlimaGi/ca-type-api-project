let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get("user_id");

let postsWrapperEl = document.querySelector("#posts-wrapper");
let postsListTitle = document.createElement("h2");
postsListTitle.classList.add("page-title");
let postsList = document.createElement("ul");
postsList.classList.add("ul-el");

postsWrapperEl.append(postsListTitle, postsList);

if (userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((res) => res.json())
    .then((posts) => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
          postsListTitle.textContent = `Posts of ${user.name}:`;

          posts.map((post) => {
            let postItem = document.createElement("li");
            postItem.classList.add("li-el");
            postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;

            postsList.prepend(postItem);
          });
        });
    });
} else {
  fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((res) => res.json())
    .then((posts) => {
      postsListTitle.textContent = "All Posts: ";

      posts.map((post) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
          .then((res) => res.json())
          .then((user) => {
            let postItem = document.createElement("li");
            postItem.classList.add("li-el");
            postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title} (${user.name})</a>`;

            postsList.prepend(postItem);
          });
      });
    });
}
