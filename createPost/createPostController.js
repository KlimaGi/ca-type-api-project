async function createNewPost(post) {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let createdPost = await res.json();
  return createdPost;
}

async function getUserById(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  let user = await res.json();
  return user;
}
export { createNewPost, getUserById };
