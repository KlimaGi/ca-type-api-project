async function getPhotosByAlbumId(albumId) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  let photos = await res.json();

  return photos;
}

async function getExpandedAlbumById(albumId) {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`
  );
  let album = await res.json();
  return album;
}

export { getPhotosByAlbumId, getExpandedAlbumById };
