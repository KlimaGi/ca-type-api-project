import { headerView } from "../headerView.js";

function createUserInit() {
  headerView();

  let createUserForm = document.querySelector("#create-user-form");
  createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let name = event.target.elements["full-name"].value;
    let username = event.target.elements.username.value;
    let email = event.target.elements.email.value;

    let street = event.target.elements.street.value;
    let suite = event.target.elements.suite.value;
    let city = event.target.elements.city.value;

    let zipcode = event.target.elements.zipcode.value;
    let lat = event.target.elements.lat.value;
    let lng = event.target.elements.lng.value;

    let phone = event.target.elements.phone.value;
    let website = event.target.elements.website.value;
    let companyName = event.target.elements.company.value;

    let catchPhrase = event.target.elements["catch-phrase"].value;
    let bs = event.target.elements.bs.value;

    let newUser = {
      id: 11,
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    let res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let createUser = await res.json();
    console.log("createUser", createUser);
  });
}

createUserInit();

let user = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};
