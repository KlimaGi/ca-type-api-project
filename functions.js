function renderListElement(data) {
  let itemEl = document.createElement("li");

  if (data.class) {
    itemEl.classList.add(data.class);
  } else itemEl.classList.add("li-el");

  itemEl.innerHTML = `<a href="${data.href}">${data.content}</a>`;
  data.parentEl.append(itemEl);
}

let capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);
