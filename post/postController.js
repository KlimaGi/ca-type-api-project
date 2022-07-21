async function getPostByIdExpandUser(id) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}?_expand=user`
  );
  let post = await res.json();
  return post;
}

async function getPostById(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  let post = await res.json();
  return post;
}

export { getPostByIdExpandUser, getPostById };
