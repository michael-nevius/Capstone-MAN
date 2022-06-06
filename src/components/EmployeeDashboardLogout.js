import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const EmployeeDashboardLogout = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  useEffect(() => {
    setNavbarTitle("Logout");
  }, []);
  const callCancleBtn = () => {
    window.location.pathname = "/e/dashboard/home";
  };
  const callLogoutBtn = () => {
    localStorage.removeItem("adminuser");
    window.location.pathname = "/admin/login";
  };
  return (
    <section className="parentDashboardLogout">
      <div className="parentDashboardLogout-wrapper flex flex-aic flex-jcc">
        <div className="parentDashboardLogout-modal">
          <div className="parentDashboardLogout-modal-header">
            Are you sure you want to Log out?
          </div>
          <div className="parentDashboardLogout-modal-btns flex flex-jcsb">
            <button
              className="parentDashboardLogout-modal-btns-cancel"
              onClick={() => {
                callCancleBtn();
              }}
            >
              {/* <Link reloadDocument={true} to="/app/dashboard/home"> */}
              Cancel
              {/* </Link> */}
            </button>
            <button
              className="parentDashboardLogout-modal-btns-yes"
              onClick={() => {
                callLogoutBtn();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDashboardLogout;
