import React from "react";
import { Link } from "react-router-dom";
import userProfile from "./../images/userProfile.png";
import "../css/employeeDashboardNavbar.scss";
const EmployeeDashboardNavbar = ({ navbarTitle, setActiveLink }) => {
  return (
    <nav className="employeeDashboardNavbar flex flex-aic flex-jcsb">
      <div className="employeeDashboardNavbar-header">
        <p>{navbarTitle}</p>
      </div>
      <div className="flex flex-aic">
        <div
          className="employeeDashboardNavbar-addChild"
          onClick={() => {
            setActiveLink(1);
          }}
        >
          <Link to="/e/dashboard/events">+ Set Event</Link>
        </div>
        <div className="employeeDashboardNavbar-btns-profile">
          <div
            className="employeeDashboardNavbar-btns-profile-imgbox"
            onClick={() => {
              setActiveLink(3);
            }}
          >
            <Link to="/e/dashboard/logout">
              <img src={userProfile}></img>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeDashboardNavbar;
