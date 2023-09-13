import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Component/Signin";
import Home from "./Component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Login";
import NotFound from "./Component/NotFound";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store";

import ChatGround from "./Component/ChatGround";
import { Test } from "./Component/Test";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/signin" element={<Signin />}></Route>

            <Route path="/chat/ground" element={<ChatGround />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/test/:id" element={<Test />}></Route>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
