import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../config/api";
import { toast } from "react-toastify";
import useStore from "../store";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleId = (event) => {
    setId(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleUser = (event) => {
    setUser(event.target.value);
  };
  const handlePass = (event) => {
    setPass(event.target.value);
  };
  const setRegistration = useStore((state) => state.setRegistration);

  const handleRegister = async (event) => {
    event.preventDefault();
    const [res, err] = await api.UserSignin({
      id: id,
      email_id: email,
      user_name: user,
      password: pass,
    });
    if (err) throw err;
    toast.success("Your Registration is successfull");
    console.log("The User Data is", res.data);
    setRegistration(res.data);
    navigate("/login");
  };

  return (
    <div className="bg-blue-950 w-full h-screen grid grid-cols-1 px-4 py-2 place-content-center place-items-center">
      <div className="w-2/3 rounded-md  shadow-lg h-full py-10 bg-white grid grid-cols-1 place-content-center place-items-center">
        <form className="w-full px-2" onSubmit={handleRegister}>
          <div className="flex flex-col justify-start items-start w-full">
            <label className="font-bold text-black text-sm ">
              Enter Your Super ID
            </label>
            <input
              type="number"
              onChange={handleId}
              className=" py-2 font-bold border-blue-950 border-2 w-full "
              placeholder="Enter Your Super ID"
            />
          </div>
          <hr className=" border-2 border-blue-950 m-1" />
          <div className="flex flex-col justify-start items-start w-full">
            <label className="font-bold text-black text-sm ">
              Enter Your Email_ID
            </label>
            <input
              type="email"
              onChange={handleEmail}
              className=" py-2 font-bold border-blue-950 border-2 w-full "
              placeholder="Enter Your Email_ID"
            />
          </div>
          <hr className=" border-2 border-blue-950 m-1" />
          <div className="flex flex-col justify-start items-start w-full px-1">
            <label className="font-bold text-black text-sm ">
              Enter Your User_ID
            </label>
            <input
              onChange={handleUser}
              type="text"
              className=" py-2 font-bold border-blue-950 border-2 w-full px-1"
              placeholder="Enter Your User_ID"
            />
          </div>
          <hr className=" border-2 border-blue-950 m-1" />
          <div className="flex flex-col justify-start items-start w-full px-1">
            <label className="font-bold text-black text-sm ">
              Enter Your Password
            </label>
            <input
              onChange={handlePass}
              type="text"
              className=" py-2 font-bold border-blue-950 border-2 w-full px-1"
              placeholder="Enter Your Password"
            />
          </div>
          <hr className=" border-2 border-blue-950 m-1" />
          <div className="grid grid-cols-1 bg-red-950 h-full px-4">
            <button
              type="submit"
              className=" text-white font-bold py-2 rounded-md"
            >
              Register
            </button>
          </div>
          <h1 className="text-black font-bold">
            Opps...? Already had an Account
          </h1>
          <Link to="/login">
            <div className="grid grid-cols-1 bg-blue-950 h-full px-4">
              <button className=" text-white font-bold py-2 rounded-md">
                Login
              </button>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
