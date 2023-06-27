const getAllUsers = "select * from sample";

const getUserByID = "select * from sample where id=$1";
const checkIdExists = "select id from sample where id =$1";
const addUser = "insert into sample (name,id) values($1,$2)";
const deleteUser = "delete from sample where id =$1";
const updateUser = "update  sample set  name=$1 where id=$2";

const checkuserIdExists = "select * from signin where email_id =$1";
const checkChatIdExists = "select * from login where user_id=$1";
const userRegister =
  "insert into signin (id,email_id,user_name,password,created_at) values($1,$2,$3,$4,$5)  returning *";

const userLogin =
  "insert into login (user_id,email_id,password) values($1,$2,$3)  returning *";

const addChat = "insert into chats (chat_id,chat) values($1,$2)";
const getChats = "select * from chats";

const usersData = "select * from signin";

const personToPersonChat =
  "insert into chatting (sender_id,receiver_id,chat) values($1,$2,$3) returning *";
const getPersonToPersonChat =
  "select * from chatting where (sender_id=$1 and receiver_id=$2) or (sender_id=$2 and receiver_id=$1)";

module.exports = {
  checkChatIdExists,
  getPersonToPersonChat,
  usersData,
  getChats,
  addChat,
  userLogin,
  getAllUsers,
  userRegister,
  getUserByID,
  checkIdExists,
  addUser,
  deleteUser,
  updateUser,
  personToPersonChat,
  checkuserIdExists,
};
