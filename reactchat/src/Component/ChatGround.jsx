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

    if (mess.length > 0) {
      const [res, err] = await api.personToPerson({
        sender_id: loginId,
        receiver_id: receiver,
        chat: mess,
      });
      setMess((document.getElementById("chatBox").value = ""));
      setMess((document.getElementById("chatBox2").value = ""));
      if (err) throw err;
      console.log(res.data);
    }

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
        <div className="text-right font-bold w-full   text-white hover:p-4 hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] hover:opacity-100 hover:text-black hover:font-extrabold  hover:bg-cover   bg-black lg:bg-transparent opacity-80 hover:border-white hover:border px-2 py-2 rounded-lg  m-1 ">
          {e.chat}
        </div>
      );
    }
    return (
      <h1 className="text-left font-bold w-full lg:bg-transparent text-white hover:p-4 hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] hover:opacity-100 hover:text-black hover:font-extrabold  hover:bg-cover   bg-black opacity-80 hover:border-white hover:border px-2 py-2 rounded-lg  m-1 ">
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
      <div className="h-[100%]  w-full lg:grid lg:grid-cols-7 bg-yellow-950 lg:bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-cover">
        <div className="lg:col-span-1 lg:block  lg:py-2 hidden overflow-scroll place-content-center">
          <h1 className="text-white font-extrabold">THE SUPER_ID'S</h1>
          {SignId.map((e) => (
            <div
              onClick={() => handleUserId(e)}
              className=" w-[95%] rounded-r-full  hover:bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-[url('https://wallpaperaccess.com/full/692085.jpg')]  font-extrabold hover:text-white  hover:px-2 border-2  border-white py-2 text-black font-extrabold text-center m-1 hover:text-start px-5"
            >
              <button type="button" key={e}>
                {e}
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-6 h-[100%] lg:block hidden  bg-green-950 col-span-6 relative w-full lg:bg-[url('https://static.vecteezy.com/system/resources/previews/001/987/871/original/abstract-black-stripes-diagonal-background-free-vector.jpg')] bg-cover place-content-start text-start lg:h-[100%] overflow-scroll text-black font-bold">
          <div className="h-[10%] w-full py-2 flex flex-row justify-around rounded-t-full bg-[url('https://wallpaperaccess.com/full/692085.jpg')] bg-cover  border-2 border-double border-white  text-center font-extrabold text-black">
            <div className="mt-2 font-extrabold">
              Hey {loginId} You are right now chatting with {receiver}
            </div>
            {chat.length > 0 && (
              <button
                className="bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')]  bg-cover px-4 py-2 rounded-md text-white font-extrabold"
                onClick={handleDelete}
              >
                Delete Chats
              </button>
            )}
          </div>
          <div className="h-[80%] py-2 overflow-scroll px-2">
            {chat.length > 0 ? (
              chat.map((e) => getfuntion(e))
            ) : (
              <h1 className="text-white text-center mt-10">
                DEAR {loginId} PLEASE START YOUR CHAT {receiver}
              </h1>
            )}
          </div>
          <div className="absolute bottom-0 w-[100%] border-2 border-black">
            <form className="flex items-center" onSubmit={handleSubmitChat}>
              <input
                type="text"
                id="chatBox2"
                className="lg:w-[94%] w-[80%] py-2 font-extrabold text-black bg-[url('https://wallpaperaccess.com/full/692085.jpg')] bg-cover px-4"
                placeholder="Enter Your Text........."
                onChange={handleChat}
              />
              <button
                type="submit"
                className="text-black bg-[url('https://wallpaperaccess.com/full/692085.jpg')] px-4 lg:w-[6%] w-[20%] py-2"
              >
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  id="send"
                  data-name="Flat Color"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon flat-color"
                >
                  <path
                    id="primary"
                    d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"
                  ></path>
                  <path
                    id="secondary"
                    d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="h-screen w-full lg:hidden bg-blue-950 col-span-6">
          <div className="h-[20%] w-full bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')]  bg-cover">
            <h1 className="text-black font-extrabold">
              THE SUPER_ID's OF THE USERS
            </h1>

            <div className="flex flex-row overflow-scroll">
              {SignId.map((e) => (
                <div
                  onClick={() => handleUserId(e)}
                  className=" w-[95%]  font-extrabold hover:bg-[url('https://wallpaperaccess.com/full/692085.jpg')] hover:bg-cover hover:w-full hover:text-black hover:px-10 border-4 border-blue-950 rounded-lg  shadow-xl py-2 text-blue-950 m-1 text-start px-5"
                >
                  <button type="button" key={e}>
                    {e}
                  </button>
                </div>
              ))}
            </div>
            {chat.length > 0 && (
              <button
                className="border-4  py-2  text-black bg-[url('https://wallpaperaccess.com/full/692085.jpg')] bg-cover   border-blue-950 w-full  font-extrabold rounded-3xl"
                onClick={handleDelete}
              >
                Delete Chat with {receiver}
              </button>
            )}
          </div>

          <div className="h-[75%] w-full relative overflow-scroll bg-[url('https://w0.peakpx.com/wallpaper/629/15/HD-wallpaper-gentlemen-nani-nivetha.jpg')]   bg-cover">
            <div className="h-[8%] w-full py-2   px-4 text-sm   text-center font-extrabold text-black">
              Hey {loginId} You are right now chatting with {receiver}
            </div>

            <div className="  h-[90%] overflow-scroll p-4">
              {chat.length > 0 ? (
                chat.map((e) => getfuntion(e))
              ) : (
                <div className=" bg-white rounded-xl hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')]  bg-cover opacity-80 ">
                  {" "}
                  <h1 className="text-black  font-extrabold text-center mt-10">
                    DEAR {loginId} <br />
                    PLEASE START YOUR CHAT {receiver}
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className=" w-[100%] h-[5%] border-2 flex items-center  border-black">
            <form
              className="w-full flex items-center"
              onSubmit={handleSubmitChat}
            >
              <input
                type="text"
                id="chatBox"
                className="lg:w-[94%] font-extrabold text-black border-none w-[90%] py-2 bg-white px-4"
                placeholder="Enter your text........"
                onChange={handleChat}
              />
              <button
                type="submit"
                className="text-black bg-white  px-0 font-extrabold lg:w-[6%] w-[10%] py-2"
              >
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  id="send"
                  data-name="Flat Color"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon flat-color"
                >
                  <path
                    id="primary"
                    d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"
                  ></path>
                  <path
                    id="secondary"
                    d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGround;
