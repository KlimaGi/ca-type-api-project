async function createNewUser(userData) {
  let res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let createdUser = await res.json();
  return createdUser;
}

export { createNewUser };
