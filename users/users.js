import { headerView } from "../headerView.js";
import { usersList } from "./usersListView.js";
import { getAllUsersEmbedPosts } from "./usersController.js";

async function usersPageInit() {
  headerView();

  let usersData = await getAllUsersEmbedPosts();
  usersList(usersData);
}

usersPageInit();
