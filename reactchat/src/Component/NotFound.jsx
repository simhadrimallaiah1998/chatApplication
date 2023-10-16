import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const handleHomeRouteFromNotFound = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center bg-[url('https://wallpaperboat.com/wp-content/uploads/2020/12/03/62926/error-404-14.jpg')]  bg-repeat-round object-cover h-screen w-full">
      <div
        onClick={handleHomeRouteFromNotFound}
        className=" text-white bg-black w-full py-2"
      >
        Go Back To Home Page
      </div>
    </div>
  );
};

export default NotFound;
