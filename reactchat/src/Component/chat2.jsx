import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as api from "../config/api.ts";
//import useStore from "../store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userDataType } from "../reduxStore/action.js";

const ChatGround = () => {
  //from-redux-store
  const usersData = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(
  //   "the data from redux store in the chatGround is",
  //   usersData.usersData[0]
  // );
  //console.log("the userid from redux store is", usersData[0].user_id);

  //from-zustand-store
  // const registration = useStore((state) => state.registration);

  const loginId = usersData.usersData[0].user_id;
  const chat_id = uuidv4();
  const email_id = usersData.usersData[0].email_id;
  // console.log("The Login User id", loginId);

  const [userData, setUserData] = useState([]);
  const [receiver, setReceiver] = useState();
  const [mess, setMess] = useState("");
  const [chat, setChat] = useState([]);
  const [getUser, setGetUser] = useState(false);
  const [show, setShow] = useState(false);
  const [sub, setSub] = useState(false);
  const [del, setDel] = useState(false);
  const [fileName, setFileName] = useState("");
  const [setting, setSetting] = useState(false);
  const [color, setColor] = useState("");
  const [hovered, setHovered] = useState(false);

  console.log("the filename is", fileName);

  useEffect(() => {
    async function registeredData() {
      try {
        const [res, err] = await api.GetAllUsers();
        if (err) throw err;
        setGetUser(!getUser);
        setUserData(res.data);
      } catch (err) {
        //console.log(err);
      }
    }
    registeredData();
  }, []);

  const handleChat = (event) => {
    setMess(event.target.value);
  };

  const userId = userData.map((e) => e.id);
  //console.log(userId);
  const SignId = userId.filter((e) => e !== loginId);

  async function handleUserId(e) {
    //console.log("The Receiver Id is", e);
    setReceiver(e);
    setShow(!show);
  }
  const handleFileName = (event) => {
    const filedImage = event.target.files[0];
    // setFileName(filedImage.name);
    const imageUrl = URL.createObjectURL(filedImage);
    setFileName(imageUrl);
  };

  useEffect(() => {
    async function getPersonalChat() {
      const [res, err] = await api.getPersonalChat({
        sender_id: loginId,
        receiver_id: receiver,
      });
      if (err) throw err;

      setChat(res.data);
    }
    getPersonalChat();
  }, [receiver, loginId, sub, del]);

  const handleSubmitChat = async (event) => {
    event.preventDefault();
    document.getElementById("chatBox").value = "";
    document.getElementById("chatBox2").value = "";

    if (mess.length > 0) {
      const [res, err] = await api.personToPerson({
        chat_id: chat_id,
        sender_id: loginId,
        receiver_id: receiver,
        chat: mess,
        created_at: new Date().toLocaleString(),
      });
      setMess((document.getElementById("chatBox").value = ""));
      setMess((document.getElementById("chatBox2").value = ""));
      setSub(!sub);
      if (err) throw err;
      console.log(res.data);
    }
  };

  const styled = { color: !hovered ? `${color}` : "black" };

  function getfuntion(e) {
    const utcTimestamp = e.created_at;
    const dateInUTC = new Date(utcTimestamp);
    dateInUTC.setTime(dateInUTC.getTime() + 0 * 60 * 60 * 1000);
    const ISTDateString = dateInUTC.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    if (e.sender_id === loginId) {
      return (
        <div
          style={styled}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="text-right font-bold w-full   text-white hover:p-4 hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] hover:opacity-100 hover:text-black hover:font-extrabold  hover:bg-cover   bg-black lg:bg-transparent opacity-80 hover:border-white hover:border px-2 py-2 rounded-lg  m-1 "
        >
          <div className="flex flex-row justify-between">
            <div>
              <button
                key={e.id}
                className="border-4  py-2  text-black bg-white  border-blue-950 px-2  font-extrabold rounded-3xl"
                onClick={() => handleDelete(e.chat_id)}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                    fill="#0D0D0D"
                  />
                </svg>
              </button>
            </div>
            <div>
              <h1>{e.chat}</h1>
              <span className="text-xs">{ISTDateString}</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1
          style={styled}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="text-left font-bold w-full lg:bg-transparent text-white hover:p-4 hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] hover:opacity-100 hover:text-black hover:font-extrabold  hover:bg-cover   bg-black opacity-80 hover:border-white hover:border px-2 py-2 rounded-lg  m-1 "
        >
          <h1> {e.chat}</h1>
          <span className="text-xs">{ISTDateString}</span>
        </h1>
      </div>
    );
  }

  const handleLogout = () => {
    navigate("/");
    try {
      dispatch({
        type: userDataType.ERASE,
        usersData: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    let confirmPassword = prompt(
      "Please confirm your email_id to delete your text"
    );

    if (confirmPassword === email_id) {
      // console.log("This deleted button has been clicked");
      const [res, err] = await api.deleteChat({
        chat_id: id,
        sender_id: loginId,
      });
      if (err) throw err;
      console.log(res);
      toast.success("You successfully deleted your text");
      setDel(!del);
    } else {
      //  console.log("you rejected to delete the text");
    }
  };

  console.log("The Color has been Set To ", color);

  return (
    <div className="h-screen w-full bg-blue-950 ">
      <div className="h-[100%]  w-full lg:grid lg:grid-cols-7 bg-yellow-950 lg:bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-cover">
        <div className="lg:col-span-1 lg:block  lg:py-2 hidden overflow-scroll place-content-center">
          <h1 className="text-white animate-bounce font-extrabold">
            THE SUPER_ID'S
          </h1>
          {SignId.map((e) => (
            <div
              onClick={() => handleUserId(e)}
              key={e.id}
              className=" w-[95%] rounded-r-full  hover:bg-[url('https://wallpapers.com/images/hd/vertical-night-sky-3c38e2irmokctrj1.jpg')] bg-[url('https://wallpaperaccess.com/full/692085.jpg')]  font-extrabold hover:text-white  hover:px-2 border-2  border-white py-2 text-black font-extrabold text-center m-1 hover:text-start px-5"
            >
              <button type="button" key={e}>
                {e}
              </button>
            </div>
          ))}
        </div>

        <div
          style={{ backgroundImage: `url(${fileName})` }}
          className="lg:col-span-6 h-[100%] lg:block hidden object-fit bg-gray-900 col-span-6 relative w-full lg:bg-[url('https://static.vecteezy.com/system/resources/previews/001/987/871/original/abstract-black-stripes-diagonal-background-free-vector.jpg')] bg-cover place-content-start text-start lg:h-[100%] overflow-scroll text-black font-bold"
        >
          <div className="h-[10%] w-full py-2   flex flex-row justify-between px-10 items-center rounded-t-full bg-[url('https://wallpaperaccess.com/full/692085.jpg')] bg-cover  border-2 border-double border-white  text-center font-extrabold text-black">
            <div className="mt-2 font-extrabold">
              Hey {loginId} You are right now chatting with {receiver}
              <br />
              <marquee direction="left" loop="">
                The New Features Will Be Added Soon...!
              </marquee>
            </div>
            <div
              className="text-black  font-extrabold"
              onClick={() => setSetting(!setting)}
            >
              <svg
                width="54px"
                height="54px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 1 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0 3 3 0 0 1 4.23 4.231 3 3 0 0 1 .001 5.984 3 3 0 0 1-4.231 4.23 3 3 0 0 1-5.984 0 3 3 0 0 1-4.231-4.23 3 3 0 0 1 0-5.984 3 3 0 0 1 4.231-4.231z"
                  fill="#0D0D0D"
                />
                <path
                  d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z"
                  fill="#0D0D0D"
                />
              </svg>
            </div>
          </div>
          <div className="h-[80%]   py-2 overflow-y-scroll overflow-hidden px-2">
            {setting && (
              <div className="flex w-full z-10   absolute -right-60 top-20 flex-col justify-start items-center">
                <div className="h-[40%] w-[50%] text-sm border-4 border-white border-solid bg-[url('https://wallpaperaccess.com/full/692085.jpg')] m-2 flex flex-col rounded-xl text-black text-center font-extrabold bg-white">
                  Welcome To The Setting Section
                  <div className="border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black text-white  hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] hover:m-4  rounded-lg  mb-2 mt-2 px-6 py-4">
                    <div>
                      <label className=" font-extrabold">
                        You Can Customize Your Wallpaper
                        <input type="file" onChange={handleFileName} />
                      </label>
                    </div>
                  </div>
                  <div className=" border-2 border-solid border-white hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black  mb-2   hover:m-4 rounded-lg  px-6 py-4 flex justify-between  text-white items-center">
                    <label className="w-full">
                      You Can Customize Your Text Color
                      <select
                        onClick={(event) => setColor(event.target.value)}
                        className="w-full text-black hover:bg-black hover:text-white"
                      >
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                        <option value="white" selected>
                          White
                        </option>
                      </select>
                    </label>
                  </div>
                  <div className=" bg-transparent  hover:m-4 rounded-lg  px-6 py-4 text-center  text-white items-center">
                    <button
                      onClick={handleLogout}
                      className="hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')] border-2 border-solid border-white rounded-lg  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black text-white px-10 py-2"
                    >
                      LogOut
                    </button>
                  </div>
                </div>
              </div>
            )}

            {chat.length > 0 ? (
              chat.map((e) => getfuntion(e))
            ) : (
              <h1 className="text-white animate-bounce text-center mt-10">
                DEAR {loginId} PLEASE START YOUR CHAT {receiver} <br />
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
                  className="icon flat-color"
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

        <div className="h-screen w-full lg:hidden  overflow-hidden bg-blue-950 col-span-6">
          <div className=" h-screen w-full bg-[url('https://e0.pxfuel.com/wallpapers/311/494/desktop-wallpaper-the-next-polylog-for-kindle-fire-x-89-for-your-mobile-tablet-explore-kindle-fire-x-for-kindle-fire-1600x2560-thumbnail.jpg')]  bg-cover">
            <div className=" h-1/12">
              <h1 className="text-white py-2 animate-bounce font-extrabold">
                THE SUPER_ID's OF THE USERS
              </h1>
              <div>
                {!show ? (
                  <button className=" w-full font-extrabold bg-[url('https://wallpaperaccess.com/full/692085.jpg')] bg-cover hover:w-full hover:text-black hover:px-4 border-t-2 border-r-4  2border-gray-300 rounded-lg  shadow-xl py-1 text-black m-1 text-center px-2">
                    WELCOME TO THE CHAT APPLICATION
                  </button>
                ) : (
                  <button
                    onClick={() => setShow(!show)}
                    className=" w-full font-extrabold bg-[url('https://wallpaperaccess.com/full/692085.jpg')] bg-cover hover:w-full hover:text-black hover:px-10 border-t-2 border-r-4  border-gray-300 rounded-lg  shadow-xl py-1 text-black m-1 text-center px-5"
                  >
                    Go Back To Users
                  </button>
                )}
              </div>
            </div>

            <div className="flex h-11/12 flex-col overflow-scroll">
              {!show && (
                <div className="h-screen  overflow-scroll pb-24">
                  {SignId.map((e) => (
                    <div className=" w-full  bg-gradient-to-br from-black via-black  to-transparent  mr-4 font-extrabold hover:bg-white hover:w-full  hover:px-10 border-t-2 border-r-4  border-gray-300 rounded-lg  shadow-xl py-1 text-white m-1 text-start px-5">
                      <div
                        type="button"
                        className="flex justify-between items-center"
                        key={e}
                      >
                        <div className="flex justify-center items-center">
                          <div className="mr-4 ">
                            <svg
                              fill="#ffffff"
                              width="32px"
                              height="32px"
                              viewBox="-3 0 19 19"
                              xmlns="http://www.w3.org/2000/svg"
                              class="cf-icon-svg"
                            >
                              <path d="M12.517 12.834v1.9a1.27 1.27 0 0 1-1.267 1.267h-9.5a1.27 1.27 0 0 1-1.267-1.267v-1.9A3.176 3.176 0 0 1 3.65 9.667h5.7a3.176 3.176 0 0 1 3.167 3.167zM3.264 5.48A3.236 3.236 0 1 1 6.5 8.717a3.236 3.236 0 0 1-3.236-3.236z" />
                            </svg>
                          </div>
                          {e}
                        </div>

                        <div onClick={() => handleUserId(e)}>
                          <svg
                            fill="#ffffff"
                            width="32px"
                            height="32px"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>chat</title>
                            <path d="M96 368Q83 368 74 359 64 349 64 336L64 128Q64 114 74 105 83 96 96 96L416 96Q430 96 439 105 448 114 448 128L448 336Q448 349 439 359 430 368 416 368L256 368 160 464 160 368 96 368Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {show && (
                <div className="h-screen  overflow-scroll">
                  <div className="h-[82%] w-full relative overflow-scroll bg-[url('https://w0.peakpx.com/wallpaper/629/15/HD-wallpaper-gentlemen-nani-nivetha.jpg')] object-top  bg-cover">
                    <div className="h-[8%] animate-pulse w-full py-2   px-4 text-sm   text-center font-extrabold text-blue-950">
                      Hey {loginId} You are right now chatting with {receiver}
                    </div>

                    <div className="  h-[90%] overflow-scroll p-4">
                      {chat.length > 0 ? (
                        chat.map((e) => getfuntion(e))
                      ) : (
                        <div className=" bg-white rounded-xl hover:bg-[url('https://png.pngtree.com/background/20210709/original/pngtree-shading-background-abstract-colorful-background-colorful-art-picture-image_938007.jpg')]  bg-cover opacity-80 ">
                          <h1 className="text-black  font-extrabold text-center mt-10">
                            DEAR {loginId} <br />
                            PLEASE START YOUR CHAT {receiver}
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" w-[100%] h-[6%] border-2 flex items-center  border-black">
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
                          className="icon flat-color"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGround;
