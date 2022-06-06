import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../css/parentDashboardLogout.scss";
const ParentDashboardLogout = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  useEffect(() => {
    setNavbarTitle("Logout");
  }, []);
  const callCancleBtn = () => {
    window.location.pathname = "/p/dashboard/home";
  };
  const callLogoutBtn = () => {
    localStorage.removeItem("loginuser");
    window.location.pathname = "/";
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

export default ParentDashboardLogout;
