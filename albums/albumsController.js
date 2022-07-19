async function getAllAlbumsByUserId(id) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`
  );
  let albums = await res.json();
  return albums;
}

export { getAllAlbumsByUserId };
