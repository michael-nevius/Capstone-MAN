import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ParentDashboardProfile = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  useEffect(() => {
    setNavbarTitle("Profile");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return <div>ParentDashboardProfile</div>;
};

export default ParentDashboardProfile;
