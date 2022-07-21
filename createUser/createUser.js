import { headerView } from "../headerView.js";
import { createNewUser } from "./createUserController.js";
import { renderCreatedPost } from "./createUserView.js";

function createUserInit() {
  headerView();

  let createUserForm = document.querySelector("#create-user-form");
  createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { elements } = event.target;

    let name = elements["full-name"].value;
    let username = elements.username.value;
    let email = elements.email.value;

    let street = elements.street.value;
    let suite = elements.suite.value;
    let city = elements.city.value;

    let zipcode = elements.zipcode.value;
    let lat = elements.lat.value;
    let lng = elements.lng.value;

    let phone = elements.phone.value;
    let website = elements.website.value;
    let companyName = elements.company.value;

    let catchPhrase = elements["catch-phrase"].value;
    let bs = elements.bs.value;

    let newUserData = {
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

    let createUser = await createNewUser(newUserData);

    renderCreatedPost(createUser);
  });
}

createUserInit();

// let user = {
//   id: 1,
//   name: "Leanne Graham",
//   username: "Bret",
//   email: "Sincere@april.biz",
//   address: {
//     street: "Kulas Light",
//     suite: "Apt. 556",
//     city: "Gwenborough",
//     zipcode: "92998-3874",
//     geo: {
//       lat: "-37.3159",
//       lng: "81.1496",
//     },
//   },
//   phone: "1-770-736-8031 x56442",
//   website: "hildegard.org",
//   company: {
//     name: "Romaguera-Crona",
//     catchPhrase: "Multi-layered client-server neural-net",
//     bs: "harness real-time e-markets",
//   },
// };
