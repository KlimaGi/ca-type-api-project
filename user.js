let capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

fetch(`https://jsonplaceholder.typicode.com/users/1`)
  .then((res) => res.json())
  .then((user) => {
    let userInfoEl = document.querySelector("#user-info");
    userInfoEl.classList.add("user-info");

    userInfoEl.innerHTML = `<ul>
    <li><strong>Name: </strong>${user.name} (${user.username})</li>
   <li><strong>Email: </strong>${user.email}</li>
    <li><strong>Address: </strong>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</li>
    <li><strong>Phone: </strong>${user.phone}</li>
   <li><strong>Website: </strong><a href="${user.website}"> ${user.website}</a></li>
   <li><strong>Company: </strong>${user.company.name}</li>
   </ul>`;

    fetch(`https://jsonplaceholder.typicode.com/users/1/posts`)
      .then((res) => res.json())
      .then((posts) => {
        let postContainer = document.querySelector("#post-container");
        let postWrapperEl = document.querySelector("#post-wrapper");

        let postsTitle = document.createElement("h3");
        postsTitle.textContent = "User posts:";
        postsTitle.classList.add("posts-title");

        postContainer.prepend(postsTitle);

        if (posts.length) {
          console.log(posts);
          posts.map((post) => {
            let postItem = document.createElement("div");
            postItem.classList.add("post-item");

            let titleCapitalize = capitalize(post.title);

            postItem.innerHTML = `<h4>${titleCapitalize}</h4>
                                  <p>${post.body}</p>
                                  <a href="post.html">Read more</a>`;

            postWrapperEl.append(postItem);
          });
        } else {
          let postItem = document.createElement("div");
          postItem.classList.add("post-item");
          postItem.textContent = "There is no posts...";
          postWrapperEl.append(postItem);
        }
      });
  });

let albumsWrapperEl = document.querySelector("#albums-wrapper");

fetch(`https://jsonplaceholder.typicode.com/users/1/albums`)
  .then((res) => res.json())
  .then((albums) => {
    albums.map((album) => {
      let albumItem = document.createElement("div");
      albumItem.classList.add("album-item");
      albumItem.innerHTML = `<h3>${album.title}</h3>
      <span>Album created by: Name Lastname</span>
      <img src="">`;

      console.log(album);
      albumsWrapperEl.prepend(albumItem);
    });
  });
