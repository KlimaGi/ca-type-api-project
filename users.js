fetch(`https://jsonplaceholder.typicode.com/users`)
  .then((res) => res.json())
  .then((users) => {
    let usersWrapper = document.querySelector("#users-wrapper");
    let usersList = document.createElement("ul");
    usersWrapper.append(usersList);
    users.map((user) => {
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then((res) => res.json())
        .then((posts) => {
          let postCount = posts.length;

          let userEl = document.createElement("li");
          userEl.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name} (${postCount} posts)</a>`;

          usersList.prepend(userEl);
        });
    });
  });
