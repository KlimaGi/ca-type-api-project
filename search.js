let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get("search-input");

console.log(queryParams);

fetch(`https://jsonplaceholder.typicode.com/users?username=${searchPhrase}`)
  .then((res) => res.json())
  .then((user) => {
    console.log("user", user);
  });
