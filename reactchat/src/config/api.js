import axios from "axios";
import { API_Routes } from "./constants";

export async function UserSignin({
  id,
  email_id,
  user_name,
  password,
  created_at,
}) {
  const data = await axios.post(API_Routes.userSignin, {
    id,
    email_id,
    user_name,
    password,
    created_at,
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

export async function GetAllUsers() {
  const data = await axios.get(API_Routes.getAllUser);
  return [data, null];
}

export async function personal({ chat_id }) {
  const data = await axios.post(API_Routes.personalChat, { chat_id });

  return [data, null];
}

export async function personToPerson({
  chat_id,
  sender_id,
  receiver_id,
  chat,
  created_at,
}) {
  const data = await axios.post(API_Routes.personToPerson, {
    chat_id,
    sender_id,
    receiver_id,
    chat,
    created_at,
  });
  return [data, null];
}

export async function getPersonalChat({ sender_id, receiver_id }) {
  const data = await axios.post(API_Routes.getPersonalChat, {
    sender_id,
    receiver_id,
  });
  return [data, null];
}

export async function deleteChat({ chat_id, sender_id }) {
  const data = await axios.post(API_Routes.deleteChat, {
    chat_id,
    sender_id,
  });
  return [data, null];
}
