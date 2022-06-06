import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decryptData } from "../crypto-js/crypto-js";

const ProtectedRouteForParentDashboard = () => {
  let user;
  let userData;
  const salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac112345";
  const idfliu = localStorage.getItem("loginuser");

  if (!idfliu) {
    window.location.pathname = "/";
  } else {
    user = decryptData(idfliu, salt);
    userData = user.userData;
    // console.log("datatata", userData);
    // idofCM = user.companyName;
  }
  if (!user) {
    window.location.pathname = "/";
  }

  return userData.ApprovalStatus ? (
    <Outlet context={user} />
  ) : (
    <Navigate to="/pending" replace />
  );
};

export default ProtectedRouteForParentDashboard;
