async function createNewComment(comment) {
  let res = await fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let createdComment = await res.json();
  return createdComment;
}

export { createNewComment };
