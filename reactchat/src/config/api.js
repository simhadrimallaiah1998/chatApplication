import axios from "axios";
import { API_Routes } from "./constants";

export async function UserSignin({ id, email_id, user_name, password }) {
  const data = await axios.post(API_Routes.userSignin, {
    id,
    email_id,
    user_name,
    password,
  });
  return [data, null];
}

export async function LoginUser({ user_id, email_id, password }) {
  const data = await axios.post(API_Routes.loginuser, {
    user_id,
    email_id,
    password,
  });
  return [data, null];
}

export async function AddChat({ chat_id, chat }) {
  const data = await axios.post(API_Routes.userChat, { chat_id, chat });
  return [data, null];
}

export async function GetChats() {
  const data = await axios.get(API_Routes.getChat);

  return [data, null];
}
