async function getUserByIdEmbedPosts(id) {
  let perPage = 5;
  let currentPage = 1;
  let res1 = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}?_embed=posts`
  );
  let userPosts1 = await res1.json();

  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}&_expand=user&_page=${currentPage}&_limit=${perPage}`
  );
  let userPosts = await res.json();
  return userPosts1;
}

async function getAllPostsExpandUser(page, limit) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_expand=user&_page=${page}&_limit=${limit}`
  );
  let posts = res.json();
  return posts;
}
export { getUserByIdEmbedPosts, getAllPostsExpandUser };
