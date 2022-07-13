function usersPageInit() {
  fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`)
    .then((res) => res.json())
    .then((users) => {
      let usersWrapper = document.querySelector("#users-wrapper");
      let usersList = document.createElement("ul");
      usersList.classList.add("ul-el");

      usersWrapper.append(usersList);

      users.map((user) => {
        let postCount = user.posts.length;
        let pluralS = postCount > 1 ? "s" : "";

        let userEl = document.createElement("li");
        userEl.classList.add("li-el");

        userEl.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name} (${postCount} post${pluralS})</a>`;

        usersList.prepend(userEl);
      });
    });
}
usersPageInit();
