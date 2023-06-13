import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-full ">
      <header className="bg-blue-950 h-screen w-full flex flex-col justify-center items-center ">
        <h1 className="font-serif font-bold text-white">
          Welcome to The chat Application
        </h1>
        <div className=" grid grid-cols-2 w-full  py-10">
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-sm font-serif text-gray-400">
                New user..? Register Yourself...!{" "}
              </h1>
              <Link to="/signin">
                <button className="bg-white px-10 py-2 mt-3 font-bold text-black rounded-xl">
                  Signin
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-sm font-serif text-gray-400">
                Already Registered..? Then Login..!
              </h1>
              <Link to="/login">
                <button className="bg-white px-10 py-2 mt-3 font-bold text-black rounded-xl">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
