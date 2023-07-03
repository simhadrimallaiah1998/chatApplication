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
      <div className="h-[100%]  w-full grid grid-cols-6 bg-yellow-950 lg:bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-cover">
        <div className="lg:col-span-1 lg:block lg:py-2 hidden overflow-scroll place-content-center">
          <h1 className="text-white font-extrabold">THE SUPER_ID'S</h1>
          {SignId.map((e) => (
            <div className=" w-[95%] font-extrabold hover:bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtdv5X5MEqVnjNLyFaXQOHnN8VE0V539Ydw&usqp=CAU')] hover:bg-cover hover:w-full hover:text-white hover:px-10 border-2 border-white py-2 text-white m-1 text-start px-5">
              <button type="button" onClick={() => handleUserId(e)} key={e}>
                {e}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 lg:block hidden  bg-green-950 col-span-6 relative w-full lg:bg-[url('https://static.vecteezy.com/system/resources/previews/001/987/871/original/abstract-black-stripes-diagonal-background-free-vector.jpg')] bg-cover place-content-start text-start lg:h-[100%] overflow-scroll text-black font-bold">
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
                className="lg:w-[94%] w-[80%] py-2 bg-gray-100 px-4"
                placeholder="please enter your text"
                onChange={handleChat}
              />
              <button
                type="submit"
                className="text-black bg-gray-100 px-4 lg:w-[6%] w-[20%] py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="h-[100%] lg:hidden bg-blue-950 col-span-6">
          <div className="h-[10%] bg-[url('https://img.freepik.com/free-vector/dark-black-background-design-with-stripes_1017-38064.jpg')]  bg-cover">
            <h1 className="text-white font-extrabold">
              THE SUPER_ID'S OF THE USERS
            </h1>
            <div className="flex flex-row overflow-scroll">
              {SignId.map((e) => (
                <div className=" w-[95%] font-extrabold hover:bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtdv5X5MEqVnjNLyFaXQOHnN8VE0V539Ydw&usqp=CAU')] hover:bg-cover hover:w-full hover:text-white hover:px-10 border-2 border-white py-2 text-white m-1 text-start px-5">
                  <button type="button" onClick={() => handleUserId(e)} key={e}>
                    {e}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <hr className="borderr-2 border-black border-dotted" />
          <div className="h-[90%] bg-[url('https://www.ixpap.com/images/2021/11/Matt-Black-Wallpaper-2.jpg')]   bg-cover">
            <div className="h-[8%] w-full py-2  bg-transparent px-4 text-sm   text-center font-bold text-white">
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
                  className="lg:w-[94%] w-[80%] py-2 bg-gray-100 px-4"
                  placeholder="please enter your text"
                  onChange={handleChat}
                />
                <button
                  type="submit"
                  className="text-black bg-gray-100 px-4 lg:w-[6%] w-[20%] py-2"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGround;
