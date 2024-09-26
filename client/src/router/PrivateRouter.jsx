import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getSessionUserData } from "../Helpers/crypto";

const PrivateRouter = () => {
  const user = getSessionUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.data?.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user?.data?.token ? <Outlet /> : null;
};

export default PrivateRouter;
