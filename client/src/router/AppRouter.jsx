import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/HOME/Home";
import Chat from "../pages/CHAT/Chat";

const Login = lazy(() => import("../pages/LOGIN/Login"));
const Register = lazy(() => import("../pages/REGISTER/Register"));
const NotFound = lazy(() => import("../pages/NOT-FOUND/NotFound"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/chat" element={<PrivateRouter />}>
          <Route path="" element={<Chat />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
