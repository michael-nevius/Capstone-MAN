import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import ParentDashboardNavbar from "../../components/ParentDashboardNavbar";
import ParentDashboardSidebar from "../../components/ParentDashboardSidebar";
import "./../../css/parentDashboard.scss";
const ParentDashboard = () => {
  const [navbarTitle, setNavbarTitle] = useState(null);
  const [activeLink, setActiveLink] = useState(-1);
  const userID = useOutletContext();
  const [eventData, setEventData] = useState(userID.eventData);
  // console.log("userr", userID.eventData);
  return (
    <>
      <section className="parentDashboard flex" style={{ flexWrap: "nowrap" }}>
        <ParentDashboardSidebar
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <div
          className="flex flex-fdc"
          style={{ flexWrap: "nowrap", flexGrow: "1" }}
        >
          <ParentDashboardNavbar
            navbarTitle={navbarTitle}
            setActiveLink={setActiveLink}
            userId={userID}
          />
          <Outlet
            context={{
              setNavbarTitle,
              userID,
              eventData,
              setEventData,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default ParentDashboard;
