async function getUserById(id) {
  let res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  let user = await res.json();
  return user;
}

async function getPostsByUserId(id) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );

  let posts = await res.json();
  return posts;
}

async function getAlbumsByUserId(id, limit) {
  let res = fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums?_expand=user&_limit=${limit}`
  );
  let albums = await (await res).json();
  return albums;
}

export { getUserById, getPostsByUserId, getAlbumsByUserId };
