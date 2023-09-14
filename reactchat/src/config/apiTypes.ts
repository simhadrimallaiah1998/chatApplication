export interface userSignTypes {
  id: string;
  email_id: string;
  user_name: string;
  password: string;
  created_at: string;
}

export interface userLoginType {
  user_id: string;
  email_id: string;
  password: string;
}

export interface personToPersonType {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  chat: string;
  created_at: string;
}

export interface getPersonalChatType {
  sender_id: string;
  receiver_id: string;
}

export interface deleteChatType {
  chat_id: string;
  sender_id: string;
}
