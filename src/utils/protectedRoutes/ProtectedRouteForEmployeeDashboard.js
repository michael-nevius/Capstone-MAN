import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decryptData } from "../crypto-js/crypto-js";

const ProtectedRouteForEmployeeDashboard = () => {
  let user;
  let auth;
  const salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac112345";
  const idfliu = localStorage.getItem("adminuser");

  if (!idfliu) {
    window.location.pathname = "/";
  } else {
    user = decryptData(idfliu, salt);
    auth = user.auth;
    // console.log("datatata", auth);
    // idofCM = user.companyName;
  }
  if (!user) {
    window.location.pathname = "/";
  }

  return auth ? <Outlet context={user} /> : <Navigate to="/" replace />;
};

export default ProtectedRouteForEmployeeDashboard;
