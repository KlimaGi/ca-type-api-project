fetch(`https://jsonplaceholder.typicode.com/users`)
  .then((res) => res.json())
  .then((users) => {
    let usersWrapper = document.querySelector("#users-wrapper");
    let usersList = document.createElement("ul");
    usersList.classList.add("ul-el");
    usersWrapper.append(usersList);

    users.map((user) => {
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then((res) => res.json())
        .then((posts) => {
          let postCount = posts.length;

          let pluralS = postCount > 1 ? "s" : "";

          let userEl = document.createElement("li");
          userEl.classList.add("li-el");
          userEl.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name} (${postCount} post${pluralS})</a>`;

          usersList.prepend(userEl);
        });
    });
  });
