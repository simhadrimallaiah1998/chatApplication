const checkuserIdExists =
  "select id=$3 from signin where email_id =$1 and password=$2";
const userRegister =
  "insert into signin (id,email_id,user_name,password,created_at) values($1,$2,$3,$4,$5)  returning *";

const userLogin =
  "insert into login (user_id,email_id,password) values($1,$2,$3)  returning *";

const usersData = "select * from signin";

const personToPersonChat =
  "insert into chatting (chat_id,sender_id,receiver_id,chat,created_at) values($1,$2,$3,$4,$5) returning *";
const getPersonToPersonChat =
  "select * from chatting where (sender_id=$1 and receiver_id=$2) or (sender_id=$2 and receiver_id=$1)";

const deleteChat = "delete from chatting where chat_id=$1 and sender_id=$2";

module.exports = {
  deleteChat,
  getPersonToPersonChat,
  usersData,
  userLogin,
  userRegister,
  personToPersonChat,
  checkuserIdExists,
};
