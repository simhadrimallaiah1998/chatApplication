import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../config/api";
import { toast } from "react-toastify";
import useStore from "../store";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");

  const handleId = (event) => {
    setId(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const setRegistration = useStore((state) => state.setRegistration);

  const handleLogin = async (event) => {
    event.preventDefault();
    const [res, err] = await api.LoginUser({
      user_id: id,
      email_id: email,
      password: pass,
    });
    if (err) throw err;
    if (res) {
      toast.success(
        "You have been Logged in to Simhadri Personal Application Successfully"
      );
      setRegistration(res.data);
      navigate("/chat/ground");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="bg-[url('https://wallpaperaccess.com/full/7781042.jpg')]  lg:bg-[url('https://img.freepik.com/premium-vector/gradient-connection-background_23-2150519259.jpg')] bg-cover w-full h-screen grid grid-cols-1 px-4 py-2 place-content-center place-items-center">
        <div className="lg:w-2/3 w-full px-10 rounded-md  shadow-lg h-full py-10  bg-transparent lg:border-2 lg:border-white grid grid-cols-1 place-content-center place-items-center">
          <form onSubmit={handleLogin} className="w-full  px-2">
            <div className="flex flex-col justify-start items-start w-full">
              <input
                onChange={handleId}
                type="text"
                className="  py-2  bg-transparent font-bold  border-gray-200 border-b-2 w-full px-3 text-white"
                placeholder="Enter Registered Super ID"
              />
            </div>
            <hr className=" lg:border-2 border-none  lg:border-blue-950 m-1" />
            <div className="flex flex-col justify-start items-start w-full">
              <input
                type="text"
                onChange={handleEmail}
                className="  py-2  bg-transparent font-bold  border-gray-200 border-b-2 w-full px-3 text-white"
                placeholder="Enter Registered Email_ID"
              />
            </div>
            <hr className=" lg:border-2 border-none lg:border-blue-950 m-1" />

            <div className="flex flex-col justify-start items-start w-full px-1">
              <input
                type="text"
                onChange={handlePass}
                className="  py-2  bg-transparent font-bold  border-gray-200 border-b-2 w-full  text-white px-3"
                placeholder="Enter Registered Password"
              />
            </div>
            <hr className=" lg:border-2 border-none lg:border-blue-950 m-1" />

            <div className="grid grid-cols-1 rounded-full   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full px-4">
              <button
                type="submit"
                className=" hover:text-black text-white text-2xl font-extrabold font-serif py-2  "
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-24 w-full">
            <h1 className="text-white font-extrabold ">Not Registered Yet?</h1>
            <Link href="/signin">
              <div className="grid grid-cols-1 rounded-full  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-full px-4">
                <button className=" hover:text-black text-white text-2xl font-extrabold font-serif py-2   rounded-md">
                  Signin
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
