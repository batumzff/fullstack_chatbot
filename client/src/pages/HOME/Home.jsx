import React, { useEffect } from "react";
import { getSessionUserData } from "../../Helpers/crypto";
import Chat from "../CHAT/Chat";
import Login from "../LOGIN/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = getSessionUserData();
  const navigate = useNavigate();
  let message = "Welcome to ChatBot";
  useEffect(() => {
    const timer = setTimeout(() => {
      message;

      user ? navigate("/chat") : navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <h1>{message}</h1>
    </div>
  );
};

export default Home;
