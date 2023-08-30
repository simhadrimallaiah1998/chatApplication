import { Base_URL } from "./server";

export const API_Routes = {
  userSignin: `${Base_URL}/user/signin`,
  loginuser: `${Base_URL}/user/login`,
  userChat: `${Base_URL}/user/add/chat`,
  // getChat: `${Base_URL}/user/all/chats`,
  getAllUser: `${Base_URL}/user/data/signin`,
  personToPerson: `${Base_URL}/user/person/to/person/chat`,
  getPersonalChat: `${Base_URL}/user/get/chats/between`,
  deleteChat: `${Base_URL}/user/delete/chat`,
};
