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

export async function GetAllUsers() {
  const data = await axios.get(API_Routes.getAllUser);
  return [data, null];
}

export async function personal({ chat_id }) {
  const data = await axios.post(API_Routes.personalChat, { chat_id });

  return [data, null];
}

export async function personToPerson({ sender_id, receiver_id, chat }) {
  const data = await axios.post(API_Routes.personToPerson, {
    sender_id,
    receiver_id,
    chat,
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

export async function deleteChat({ sender_id, receiver_id }) {
  const data = await axios.post(API_Routes.deleteChat, {
    sender_id,
    receiver_id,
  });
  return [data, null];
}
