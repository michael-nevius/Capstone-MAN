import React from "react";
import { Link } from "react-router-dom";
import "../css/employeeDashboardSidebar.scss";
const EmployeeDashboardSidebar = ({ activeLink, setActiveLink }) => {
  const links = [
    {
      title: "Home",
      iclass: "bx bx-home-alt",
      link: "home",
    },
    {
      title: "Set Events",
      iclass: "bx bx-calendar-event",
      link: "events",
    },
    {
      title: "Application",
      iclass: "bx bx-user-check",
      link: "application",
    },
    {
      title: "Logout",
      iclass: "bx bx-log-out",
      link: "logout",
    },
  ];
  return (
    <section className="employeeDashboardSidebar">
      <div className="employeeDashboardSidebarDiv">
        <div className="employeeDashboardSidebarDiv-logo">
          <p>T Rex and Friends DayCare</p>
        </div>
        <div className="employeeDashboardSidebarDiv-links">
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
                    idx === activeLink
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

export default EmployeeDashboardSidebar;
