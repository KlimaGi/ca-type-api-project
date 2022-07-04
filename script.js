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

      let author = document.createElement("a");
      author.href = "#";

      let postBody = document.createElement("p");
      postBody.textContent = post.body;

      fetch(`https://jsonplaceholder.typicode.com/users/${post.id}`)
        .then((res) => res.json())
        .then((user) => {
          author.textContent = user.name;
        });

      postItemEl.append(postTitle, author, postBody);
      postWrapperEl.append(postItemEl);
    });
  });
