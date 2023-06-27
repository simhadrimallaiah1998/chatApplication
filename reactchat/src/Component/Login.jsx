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
      toast.success("You have been Logged in Successfully");
      setRegistration(res.data);
      navigate("/chat/ground");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="bg-[url('https://img.freepik.com/premium-vector/gradient-connection-background_23-2150519259.jpg')] bg-cover w-full h-screen grid grid-cols-1 px-4 py-2 place-content-center place-items-center">
        <div className="w-2/3 rounded-md  shadow-lg h-full py-10  bg-transparent border-2 border-white grid grid-cols-1 place-content-center place-items-center">
          <form onSubmit={handleLogin} className="w-full px-2">
            <div className="flex flex-col justify-start items-start w-full">
              <input
                onChange={handleId}
                type="text"
                className="  py-2  bg-transparent font-bold  border-gray-200 border-b-2 w-full px-3 text-white"
                placeholder="Enter Registered Super ID"
              />
            </div>
            <hr className=" border-2 border-blue-950 m-1" />
            <div className="flex flex-col justify-start items-start w-full">
              <input
                type="text"
                onChange={handleEmail}
                className="  py-2  bg-transparent font-bold  border-gray-200 border-b-2 w-full px-3 text-white"
                placeholder="Enter Registered Email_ID"
              />
            </div>
            <hr className=" border-2 border-blue-950 m-1" />

            <div className="flex flex-col justify-start items-start w-full px-1">
              <input
                type="text"
                onChange={handlePass}
                className="  py-2  bg-transparent font-bold  border-gray-200 border-b-2 w-full  text-white px-3"
                placeholder="Enter Registered Password"
              />
            </div>
            <hr className=" border-2 border-blue-950 m-1" />

            <div className="grid grid-cols-1   bg-gradient-to-br from-blue-950 via-white to-blue-950 h-full px-4">
              <button
                type="submit"
                className=" text-black font-bold py-2  text-lg rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
