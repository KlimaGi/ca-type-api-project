async function getAllUsersEmbedPosts() {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_embed=posts`
  );
  let usersData = await res.json();

  return usersData;
}

async function getAllUsers() {
  let res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await res.json();
  return users;
}

export { getAllUsersEmbedPosts, getAllUsers };
