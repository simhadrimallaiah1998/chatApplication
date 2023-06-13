import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Component/Signin";
import Home from "./Component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import NotFound from "./Component/NotFound";
import Message from "./Component/Message";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/message" element={<Message />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
