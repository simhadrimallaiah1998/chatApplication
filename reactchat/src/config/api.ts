import axios from "axios";
import { API_Routes } from "./constants";
import {
  userSignTypes,
  userLoginType,
  personToPersonType,
  getPersonalChatType,
  deleteChatType,
} from "./apiTypes";

export async function UserSignin(payload: userSignTypes) {
  const data = await axios.post(API_Routes.userSignin, payload);
  return [data, null];
}

export async function LoginUser(payload: userLoginType) {
  const data = await axios.post(API_Routes.loginuser, payload);
  return [data, null];
}

export async function GetAllUsers() {
  const data = await axios.get(API_Routes.getAllUser);
  return [data, null];
}

export async function personToPerson(payload: personToPersonType) {
  const data = await axios.post(API_Routes.personToPerson, payload);
  return [data, null];
}

export async function getPersonalChat(payload: getPersonalChatType) {
  const data = await axios.post(API_Routes.getPersonalChat, payload);
  return [data, null];
}

export async function deleteChat(payload: deleteChatType) {
  const data = await axios.post(API_Routes.deleteChat, payload);
  return [data, null];
}
