import React, { useEffect, useState } from "react";
import * as api from "../config/api";
import { toast } from "react-toastify";

const Message = () => {
  const [messData, setMessData] = useState([]);
  const [send, setSend] = useState(true);
  const [id, setId] = useState();
  const [mess, setMess] = useState("");

  const handleChat_id = (event) => {
    setId(event.target.value);
  };
  const handleMessage = (event) => {
    setMess(event.target.value);
  };

  const handleChat = async (event) => {
    event.preventDefault();

    setSend(!send);
    const [res, err] = await api.AddChat({ chat_id: id, chat: mess });
    if (err) throw err;
    console.log(res);
    toast.success("you added your Text");
  };

  async function getPreviousChat() {
    const [res, err] = await api.GetChats();
    if (err) throw err;
    console.log(res);
    setMessData(res.data);
  }

  useEffect(() => {
    getPreviousChat();
  }, [send]);

  console.log("the messages till now is", messData);
  return (
    <div>
      <div className="bg-blue-950 w-full relative h-screen grid grid-cols-1 px-4 py-2">
        <div className="w-full overflow-hidden">
          <h1 className="text-white font-bold fontserif ">
            Welcome to chat Personal Chat Session
          </h1>

          <div className="w-full mb-14 h-5/6 overflow-scroll">
            {messData.map((e) => (
              <div className="flex m-1 flex-row justify-between items-center py-1 bg-green-950">
                <h1 className="font-bold text-white px-5">{e.chat_id}</h1>
                <h1 className="font-bold text-white font-serif px-5">
                  {e.chat}
                </h1>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleChat}
            className="w-full px-2 absolute bottom-0 "
          >
            <div className="flex flex-row justify-between items-center w-full px-1 ">
              <input
                type="text"
                onChange={handleChat_id}
                className=" py-2 font-bold text-sm border-blue-950 border-2 px-1 w-1/6"
                placeholder="Chat_ID"
              />
              <input
                type="text"
                onChange={handleMessage}
                className=" py-2 font-bold border-blue-950 px-1 border-2 w-full"
                placeholder="Enter your Chat"
              />
              <button
                type="submit"
                className=" text-blue-950 font-bold py-2 bg-white px-8 rounded-md"
              >
                send
              </button>
            </div>

            <hr className=" border-2 border-blue-950 m-1" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
