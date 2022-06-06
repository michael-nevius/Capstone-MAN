import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import EmployeeDashboardNavbar from "../../components/EmployeeDashboardNavbar";
import EmployeeDashboardSidebar from "../../components/EmployeeDashboardSidebar";

const EmployeeDashboard = () => {
  const [navbarTitle, setNavbarTitle] = useState(null);
  const [activeLink, setActiveLink] = useState(0);
  return (
    <section className="parentDashboard flex" style={{ flexWrap: "nowrap" }}>
      <EmployeeDashboardSidebar
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
      <div
        className="flex flex-fdc"
        style={{ flexWrap: "nowrap", flexGrow: "1" }}
      >
        <EmployeeDashboardNavbar
          navbarTitle={navbarTitle}
          setActiveLink={setActiveLink}
        />
        <Outlet context={{ setNavbarTitle }} />
      </div>
    </section>
  );
};

export default EmployeeDashboard;
