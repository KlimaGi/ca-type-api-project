async function editComment(comment) {
  let { id } = comment;

  let res = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(comment),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let editedComment = await res.json();
  return editedComment;
}

export { editComment };
