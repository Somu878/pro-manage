import React, { useEffect } from "react";
// import io from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.css";

function App() {
  // const socket = io("http://localhost:9000");
  // useEffect(() => {
  //   socket.on("yourCustomEvent", (data) => {
  //     console.log("Received data from server:", data);
  //   });
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
