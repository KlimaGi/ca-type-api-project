async function getUserByIdEmbedPosts(id) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`
  );
  let userPosts = await res.json();
  return userPosts;
}

async function getAllPostsExpandUser() {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_expand=user`
  );
  let posts = res.json();
  return posts;
}
export { getUserByIdEmbedPosts, getAllPostsExpandUser };
