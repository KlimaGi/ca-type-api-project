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

function renderOptionEl(data) {
  let optionEl = document.createElement("option");
  optionEl.textContent = `-- ${data.content}`;
  optionEl.setAttribute("value", `${data.value}`);
  data.parentEl.append(optionEl);
}

function renderSingleComment(comment, commentsWrapper) {
  let commentItem = document.createElement("div");
  commentItem.classList.add("comment-item");

  let commentTitle = document.createElement("h5");
  commentTitle.textContent = capitalize(comment.name);
  commentTitle.classList.add("title");

  let commentEmail = document.createElement("span");
  commentEmail.textContent = `Comment by: ${comment.email}`;

  let commentBody = document.createElement("p");
  commentBody.textContent = comment.body;

  commentItem.append(commentTitle, commentEmail, commentBody);
  commentsWrapper.append(commentItem);
}

function renderAlbum(data) {
  let { album } = data;
  let swiperWrapperEl = document.querySelector("#swiper-wrapper-home-page");

  let albumItem = document.createElement("div");
  albumItem.classList.add("swiper-slide");

  let albumTitle = document.createElement("h5");
  let capitalizeTitle = capitalize(album.title);

  albumTitle.innerHTML = `<a class="link" href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.user.id}&user_name=${album.user.name}">${capitalizeTitle}</a>`;

  let albumAuthor = document.createElement("span");
  albumAuthor.textContent = `Album created by: ${album.user.name}`;

  let imgEl = document.createElement("img");
  imgEl.src = `${album.photos[0].thumbnailUrl}`;

  albumItem.append(imgEl, albumTitle, albumAuthor);
  swiperWrapperEl.prepend(albumItem);
}

export {
  renderListElement,
  capitalize,
  renderSingleComment,
  renderAlbum,
  renderOptionEl,
};
