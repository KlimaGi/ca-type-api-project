function renderCreatedPost(createUser) {
  let { name, username, email, address, phone, website, company } = createUser;

  let createUserWrapper = document.querySelector("#create-user-wrapper");
  let userEl = document.createElement("div");
  userEl.innerHTML = `<ul>
    <li><strong>Name: </strong>${name} (${username})</li>
   <li><strong>Email: </strong>${email}</li>
    <li><strong>Address: </strong>${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}</li>
    <li><strong>Phone: </strong>${phone}</li>
   <li><strong>Website: </strong><a class="link" href="${website}"> ${website}</a></li>
   <li><strong>Company: </strong>${company.name}</li>
   </ul>`;

  createUserWrapper.append(userEl);
}

export { renderCreatedPost };
