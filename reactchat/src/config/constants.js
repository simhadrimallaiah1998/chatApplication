import { Base_URL } from "./server";

export const API_Routes = {
  userSignin: `${Base_URL}/user/signin`,
  loginuser: `${Base_URL}/user/login`,
  userChat: `${Base_URL}/user/add/chat`,
  getChat: `${Base_URL}/user/all/chats`,
  personalChat: `${Base_URL}/user/personal/chats/:chat_id`,
};
