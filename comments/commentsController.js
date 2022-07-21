async function getCommentsByPostId(postId) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  let comments = await res.json();
  return comments;
}

export { getCommentsByPostId };
