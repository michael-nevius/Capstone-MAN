import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../css/parentDashboardNavbar.scss";
import userProfile from "./../images/userProfile.png";

const ParentDashboardNavbar = ({ navbarTitle, setActiveLink, userId }) => {
  return (
    <nav className="parentDashboardNavbar flex flex-aic flex-jcsb">
      <div className="parentDashboardNavbar-header">
        <p>{navbarTitle}</p>
      </div>
      <div className="flex flex-aic">
        <div
          className="parentDashboardNavbar-addChild"
          onClick={() => {
            setActiveLink(1);
          }}
        >
          <Link to="/p/dashboard/add-child">+ Add Child</Link>
        </div>
        <div className="parentDashboardNavbar-balance flex flex-aic">
          <i class="bx bxs-coin"></i> {userId.userData.BalanceDue}
        </div>
        <div className="parentDashboardNavbar-btns-profile">
          <div
            className="parentDashboardNavbar-btns-profile-imgbox"
            onClick={() => {
              setActiveLink(3);
            }}
          >
            <Link to="/p/dashboard/logout">
              <img src={userProfile}></img>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ParentDashboardNavbar;
