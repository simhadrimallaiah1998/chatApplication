import React, { useEffect, useState } from "react";
import * as api from "../config/api";
import useStore from "../store";

const ChatGround = () => {
  const registration = useStore((state) => state.registration);
  const loginId = registration[0][0].user_id;
  console.log("The Login User id", loginId);
  const [userData, setUserData] = useState([]);
  const [receiver, setReceiver] = useState();
  const [mess, setMess] = useState("");
  const [chat, setChat] = useState([]);

  async function RegisteredUser() {
    const [res, err] = await api.GetAllUsers();
    if (err) throw err;

    setUserData(res.data);
  }

  const handleChat = (event) => {
    setMess(event.target.value);
  };

  async function PreviousChat() {
    console.log("This is called");
    const [res, err] = await api.GetChats();
    if (err) throw err;
    console.log(res.data);
  }

  useEffect(() => {
    RegisteredUser();
    PreviousChat();
  }, []);

  const userId = userData.map((e) => e.id);
  console.log(userId);
  const SignId = userId.filter((e) => e !== loginId);

  async function handleUserId(e) {
    console.log("The Receiver Id is", e);
    setReceiver(e);
  }

  useEffect(() => {
    async function getPersonalChat() {
      const [res, err] = await api.getPersonalChat({
        sender_id: loginId,
        receiver_id: receiver,
      });
      if (err) throw err;
      console.log(res);
      setChat(res.data);
    }
    getPersonalChat();
  }, [loginId, receiver]);

  const handleSubmitChat = async (event) => {
    event.preventDefault();

    const [res, err] = await api.personToPerson({
      sender_id: loginId,
      receiver_id: receiver,
      chat: mess,
    });
    if (err) throw err;
    console.log(res.data);

    async function getPersonalChat() {
      const [res, err] = await api.getPersonalChat({
        sender_id: loginId,
        receiver_id: receiver,
      });
      if (err) throw err;
      console.log(res);
      setChat(res.data);
    }
    getPersonalChat();
  };
  console.log("The Chats between them is", chat);

  function getfuntion(e) {
    if (e.sender_id === loginId) {
      return (
        <div className="text-right text-white   bg-transparent hover:border-white hover:border px-2 py-2 rounded-lg  m-2 ">
          {e.chat}
        </div>
      );
    }
    return (
      <h1 className="text-left text-white bg-transparent hover:border-white hover:border px-2 py-2 rounded-lg m-2 ">
        {e.chat}
      </h1>
    );
  }

  return (
    <div className="h-screen w-full bg-blue-950 ">
      <div className="h-[5%] w-full  bg-gradient-to-tr from-blue-950 to-red-950 text-center font-bold text-white">
        This page is not yet done ..?The Design is still under Process But You
        Can Experience The Basic Layout
      </div>
      <div className="h-[95%] w-full grid grid-cols-6 bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-cover">
        <div className="col-span-1   t h-full overflow-scroll place-content-center">
          <h1 className="text-white font-extrabold">THE SUPER_ID'S</h1>
          {SignId.map((e) => (
            <div className=" w-[95%] font-extrabold hover:bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtdv5X5MEqVnjNLyFaXQOHnN8VE0V539Ydw&usqp=CAU')] hover:bg-cover hover:w-full hover:text-white hover:px-10 border-2 border-white py-2 text-white m-1 text-start px-5">
              <button type="button" onClick={() => handleUserId(e)} key={e}>
                {e}
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-5 relative w-full bg-[url('https://static.vecteezy.com/system/resources/previews/001/987/871/original/abstract-black-stripes-diagonal-background-free-vector.jpg')] bg-cover place-content-start text-start h-[100%] overflow-scroll text-black font-bold">
          <div className="h-[8%] w-full py-2  bg-transparent  border-2 border-double border-white  text-center font-bold text-white">
            Hey {loginId} You are right now chatting with {receiver}
          </div>
          <div>
            {chat.length > 0 ? (
              chat.map((e) => getfuntion(e))
            ) : (
              <h1 className="text-white text-center mt-10">
                Opps....!You Haven't Started Chat before...!
              </h1>
            )}
          </div>
          <div className="absolute bottom-0 w-[100%] border-2 border-black">
            <form onSubmit={handleSubmitChat}>
              <input
                type="text"
                className="w-[94%] py-2 bg-gray-100 px-4"
                placeholder="please enter your text"
                onChange={handleChat}
              />
              <button
                type="submit"
                className="text-black bg-gray-100 px-4 w-[6%] py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGround;
