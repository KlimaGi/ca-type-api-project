async function getPostByUserId(id) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}?_expand=user`
  );
  let post = await res.json();
  return post;
}

export { getPostByUserId };
