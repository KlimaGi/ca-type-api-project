import { headerView } from "../headerView.js";
import { usersList } from "./usersListView.js";
import { getAllUsers } from "./usersController.js";

async function usersPageInit() {
  headerView();

  let usersData = await getAllUsers();
  usersList(usersData);
}

usersPageInit();
