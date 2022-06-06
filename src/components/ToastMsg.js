import React from "react";
import "../css/toastMsg.scss";
const ToastMsg = ({ msg }) => {
  return (
    <div className="toastMsg">
      <p>{msg}</p>
    </div>
  );
};

export default ToastMsg;
