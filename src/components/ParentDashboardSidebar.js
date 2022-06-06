import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../css/parentDashboardSidebar.scss";

const ParentDashboardSidebar = ({ activeLink, setActiveLink }) => {
  const path = window.location.pathname.slice(1);
  const links = [
    {
      title: "Home",
      iclass: "bx bx-home-alt",
      link: "home",
    },
    {
      title: "Add Child",
      iclass: "bx bx-plus",
      link: "add-child",
    },
    {
      title: "Events",
      iclass: "bx bx-calendar-event",
      link: "events",
    },
    {
      title: "Logout",
      iclass: "bx bx-log-out",
      link: "logout",
    },
  ];
  return (
    <section className="parentDashboardSidebar">
      <div className="parentDashboardSidebarDiv">
        <div className="parentDashboardSidebarDiv-logo">
          <p>T Rex and Friends DayCare</p>
        </div>
        <div className="parentDashboardSidebarDiv-links">
          <ul>
            {links.map((link, idx) => {
              return (
                <Link
                  to={link.link}
                  key={idx}
                  onClick={(e) => {
                    setActiveLink(idx);
                  }}
                  className={
                    path.toLowerCase().includes(link.link) || idx === activeLink
                      ? "flex flex-aic active"
                      : "flex flex-aic"
                  }
                >
                  <i className={link.iclass}></i>
                  {link.title}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ParentDashboardSidebar;
