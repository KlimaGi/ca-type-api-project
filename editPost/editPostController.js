async function editPost(postData) {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let editedPost = await res.json();

  return editedPost;
}

export { editPost };
