import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../config/api";
import { toast } from "react-toastify";
import useStore from "../store";

const Login = () => {
  const registration = useStore((state) => state.registration);
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  console.log("login page registration", registration);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    const [res, err] = await api.LoginUser({
      user_id: id,
      email_id: email,
      password: pass,
    });
    if (err) throw err;
    if (res) {
      toast.success("You have been Login Successfully");
      navigate("/message");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="bg-blue-950 w-full h-screen grid grid-cols-1 px-4 py-2 place-content-center place-items-center">
        <div className="w-2/3 rounded-md  shadow-lg h-full py-10 bg-gray-400 grid grid-cols-1 place-content-center place-items-center">
          <form onSubmit={handleLogin} className="w-full px-2">
            <div className="flex flex-col justify-start items-start w-full">
              <label className="font-bold text-black text-sm ">
                Enter Registered Super ID
              </label>
              <input
                onChange={handleId}
                type="text"
                className=" py-2 font-bold border-blue-950 border-2 w-full "
                placeholder="Enter Registered Super ID"
              />
            </div>
            <hr className=" border-2 border-blue-950 m-1" />
            <div className="flex flex-col justify-start items-start w-full">
              <label className="font-bold text-black text-sm ">
                Enter Registered Email_ID
              </label>
              <input
                type="text"
                onChange={handleEmail}
                className=" py-2 font-bold border-blue-950 border-2 w-full "
                placeholder="Enter Registered Email_ID"
              />
            </div>
            <hr className=" border-2 border-blue-950 m-1" />

            <div className="flex flex-col justify-start items-start w-full px-1">
              <label className="font-bold text-black text-sm ">
                Enter Registered Password
              </label>
              <input
                type="text"
                onChange={handlePass}
                className=" py-2 font-bold border-blue-950 border-2 w-full px-1"
                placeholder="Enter Registered Password"
              />
            </div>
            <hr className=" border-2 border-blue-950 m-1" />

            <div className="grid grid-cols-1 bg-blue-950 h-full px-4">
              <button
                type="submit"
                className=" text-white font-bold py-2 rounded-md"
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
