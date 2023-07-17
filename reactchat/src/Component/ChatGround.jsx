import React, { useEffect, useState } from "react";
import * as api from "../config/api";
import useStore from "../store";

const ChatGround = () => {
  const registration = useStore((state) => state.registration);
  const loginId = registration[0][0].user_id;
  const email_id = registration[0][0].email_id;
  console.log("The Login User id", loginId);
  const [userData, setUserData] = useState([]);
  const [receiver, setReceiver] = useState();
  const [mess, setMess] = useState("");
  const [chat, setChat] = useState([]);
  const [del, setDel] = useState(false);

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
  }, [loginId, receiver, del]);

  const handleSubmitChat = async (event) => {
    event.preventDefault();
    document.getElementById("chatBox").value = "";
    document.getElementById("chatBox2").value = "";

    const [res, err] = await api.personToPerson({
      sender_id: loginId,
      receiver_id: receiver,
      chat: mess,
    });
    setMess((document.getElementById("chatBox").value = ""));
    setMess((document.getElementById("chatBox2").value = ""));
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
        <div className="text-right text-white   bg-transparent hover:border-white hover:border px-2 py-2 rounded-lg  m-1 ">
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

  const handleDelete = async () => {
    let confirmPassword = prompt("Please enter your email_id", "");

    if (confirmPassword === email_id) {
      console.log("This deleted button has been clicked");
      const [res, err] = await api.deleteChat({
        sender_id: loginId,
        receiver_id: receiver,
      });
      if (err) throw err;
      console.log(res);
      setDel(!del);
    } else {
      console.log("you rejected to delete the text");
    }
  };

  return (
    <div className="h-screen w-full bg-blue-950 ">
      <div className="h-[100%]  w-full grid grid-cols-6 bg-yellow-950 lg:bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-cover">
        <div className="lg:col-span-1 lg:block lg:py-2 hidden overflow-scroll place-content-center">
          <h1 className="text-white font-extrabold">THE SUPER_ID'S</h1>
          {SignId.map((e) => (
            <div className=" w-[95%] font-extrabold hover:bg-gradient-to-tr from-blue-950 via-white to-blue-950  hover:text-black hover:px-10 border-2 border-white py-2 text-white m-1 text-start px-5">
              <button type="button" onClick={() => handleUserId(e)} key={e}>
                {e}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 h-[100%] lg:block hidden  bg-green-950 col-span-6 relative w-full lg:bg-[url('https://static.vecteezy.com/system/resources/previews/001/987/871/original/abstract-black-stripes-diagonal-background-free-vector.jpg')] bg-cover place-content-start text-start lg:h-[100%] overflow-scroll text-black font-bold">
          <div className="h-[10%] w-full py-2 flex flex-row justify-around  bg-gradient-to-t from-blue-950 via-white to-blue-950   border-2 border-double border-white  text-center font-extrabold text-black">
            <div className="mt-2 font-extrabold">
              Hey {loginId} You are right now chatting with {receiver}
            </div>
            <button
              className="bg-gradient-to-tr from-blue-950 via-white to-blue-950 px-4 py-2 rounded-md"
              onClick={handleDelete}
            >
              Delete Chats
            </button>
          </div>
          <div className="h-[85%] overflow-scroll">
            {chat.length > 0 ? (
              chat.map((e) => getfuntion(e))
            ) : (
              <h1 className="text-white text-center mt-10">
                Dear {loginId} <br />
                You Haven't Started Chatted with {receiver} before...!
                <br />
                PLEASE START YOUR CHAT
              </h1>
            )}
          </div>
          <div className="absolute bottom-0 w-[100%] border-2 border-black">
            <form onSubmit={handleSubmitChat}>
              <input
                type="text"
                id="chatBox2"
                className="lg:w-[94%] w-[80%] py-2 font-extrabold text-black bg-gray-100 px-4"
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
          <div className="h-[15%]  bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')]  bg-cover">
            <h1 className="text-black font-extrabold">
              THE SUPER_ID's OF THE USERS
            </h1>

            <div className="flex flex-row overflow-scroll">
              {SignId.map((e) => (
                <div className=" w-[95%] font-extrabold hover:bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtdv5X5MEqVnjNLyFaXQOHnN8VE0V539Ydw&usqp=CAU')] hover:bg-cover hover:w-full hover:text-white hover:px-10 border-4 border-blue-950 rounded-lg  shadow-xl py-2 text-blue-950 m-1 text-start px-5">
                  <button type="button" onClick={() => handleUserId(e)} key={e}>
                    {e}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="border-4 mt-2 py-2 text-white bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtdv5X5MEqVnjNLyFaXQOHnN8VE0V539Ydw&usqp=CAU')]  border-blue-950 w-full  font-extrabold rounded-md"
              onClick={handleDelete}
            >
              Delete Chat with {receiver}
            </button>
          </div>

          <div className="h-[80%] relative overflow-scroll bg-[url('https://i.pinimg.com/originals/4d/fc/98/4dfc98fe97aec74439cc1701fbf599dc.jpg')]   bg-cover">
            <div className="h-[10%] w-full py-2  bg-gradient-to-t from-transparent via-blue-800 to-transparent px-4 text-sm   text-center font-extrabold text-white">
              Hey {loginId} You are right now chatting with {receiver}
            </div>

            <div className="  h-[90%] overflow-scroll p-4">
              {chat.length > 0 ? (
                chat.map((e) => getfuntion(e))
              ) : (
                <h1 className="text-white text-center mt-10">
                  Dear {loginId} <br />
                  You Haven't Started Chatted with {receiver} before...!
                  <br />
                  PLEASE START YOUR CHAT
                </h1>
              )}
            </div>
          </div>
          <div className=" w-[100%] h-[5%] border-2 border-black">
            <form onSubmit={handleSubmitChat}>
              <input
                type="text"
                id="chatBox"
                className="lg:w-[94%] font-extrabold text-black border-none w-[80%] py-2 bg-gray-100 px-4"
                placeholder="please enter your text"
                onChange={handleChat}
              />
              <button
                type="submit"
                className="text-black bg-gray-100 px-2 font-extrabold lg:w-[6%] w-[20%] py-2"
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
