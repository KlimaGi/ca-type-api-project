async function getAllPosts() {
  let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  let posts = await res.json();
  return posts;
}

async function getPostsWithLimit(limit) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${limit}`
  );
  let posts = await res.json();
  return posts;
}

async function getUserByIdEmbedPosts(id) {
  let limit = 10;
  let currentPage = 1;

  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}&_expand=user&_page=${currentPage}&_limit=${limit}`
  );
  let userPosts = await res.json();
  return userPosts;
}

async function getAllPostsExpandUser(page, limit) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_expand=user&_page=${page}&_limit=${limit}`
  );
  let posts = res.json();
  return posts;
}
export {
  getAllPosts,
  getPostsWithLimit,
  getUserByIdEmbedPosts,
  getAllPostsExpandUser,
};
