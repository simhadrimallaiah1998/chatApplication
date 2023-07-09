import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../config/api";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [exist, setExist] = useState([]);

  useEffect(() => {
    async function GetUserId() {
      const [res, err] = await api.GetAllUsers();
      if (err) throw err;
      setExist(res.data);
    }
    GetUserId();
  }, []);

  console.log("The Already Existed Id", exist);

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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (id.length < 7) {
      const [res, err] = await api.UserSignin({
        id: id,
        email_id: email,
        user_name: user,
        password: pass,
        created_at: new Date(),
      });
      if (err) throw err;
      toast.success("Your Registration is Successfull");
      console.log("The User Data is", res.data);

      navigate("/login");
    } else {
      alert("The SuperID shouldn't more than 6 digits");
    }
  };

  return (
    <div className="bg-[url('https://w0.peakpx.com/wallpaper/20/744/HD-wallpaper-black-pattern-black-design-modern-thumbnail.jpg')]    lg:bg-[url('https://t3.ftcdn.net/jpg/02/92/90/56/360_F_292905667_yFUJNJPngYeRNlrRL4hApHWxuYyRY4kN.jpg')] bg-cover w-full h-screen grid grid-cols-1 px-4 py-2 place-content-center place-items-end">
      <div className="lg:w-1/2 w-full rounded-md  h-full py-10   bg-transparent lg:border-2 lg:border-white grid grid-cols-1  place-content-center place-items-center">
        <form className="w-full px-2" onSubmit={handleRegister}>
          <div className="flex flex-col justify-start items-start w-full">
            <input
              type="number"
              onChange={handleId}
              className=" py-2  bg-transparent font-bold   border-gray-500 border-b-2 w-full m-1 px-3 text-white lg:text-black"
              placeholder="Enter Your Super ID"
            />
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <input
              type="email"
              onChange={handleEmail}
              className=" py-2  bg-transparent font-bold m-1 border-gray-500 border-b-2 w-full px-3 text-white lg:text-black"
              placeholder="Enter Your Email_ID"
            />
          </div>

          <div className="flex flex-col justify-start items-start w-full px-1">
            <input
              onChange={handleUser}
              type="text"
              className=" py-2  bg-transparent font-bold  border-gray-500 m-1 border-b-2 w-full px-3 text-white lg:text-black"
              placeholder="Enter Your User_ID"
            />
          </div>

          <div className="flex flex-col justify-start items-start w-full px-1">
            <input
              onChange={handlePass}
              type="text"
              className=" py-2  bg-transparent font-bold m-1 border-gray-500 border-b-2 w-full px-3 text-white lg:text-black"
              placeholder="Enter Your Password"
            />
          </div>

          <div className="grid grid-cols-1 mt-1 rounded-lg  bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:text-black h-full px-4">
            <button
              type="submit"
              className=" text-white font-bold py-2 rounded-md"
            >
              Register
            </button>
          </div>
          <h1 className="lg:text-black text-white font-bold">
            Already had an Account..?then Please do Login
          </h1>
          <Link to="/">
            <div className="grid grid-cols-1 rounded-lg bg-gradient-to-r  from-fuchsia-500 to-violet-500 h-full px-4">
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
