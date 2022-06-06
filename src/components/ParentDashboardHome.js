import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../css/parentDashboardHome.scss";
import { baseURL } from "../utils/api/baseURL";
import ParentDashboardChildDocs from "./ParentDashboardChildDocs";
import ParentDashboardEventPopup from "./ParentDashboardEventPopup";


const ParentDashboardHome = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle, userID, eventData, setEventData } = outletData;
  const [documentsModal, setDocumentsModal] = useState(false);
  const [childData, setChildData] = useState(null);
  const [childDocs, setChildDocs] = useState(null);
  const [popupStatus, setPopupStatus] = useState(localStorage.getItem("popup"));
  // console.log("iiii", popupStatus);
  // useEffect(() => {
  //   if (setEventData) {
  //     setEventData(userID.eventData);
  //   }
  // }, []);
  useEffect(() => {
    setNavbarTitle("Dashboard");
    const callChildDataAPI = () => {
      fetch(baseURL + `getAllChildren/${userID.userData.ParentId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const { status } = res;
          if (status === 200) {
            setChildData(res.childrenData);
          } else {
            setChildData(null);
          }
        })
        .catch((error) => {
          // console.log(error);
          console.clear();
        });
    };
    callChildDataAPI();
  }, []);

  return (
    <section className="parentDashboardHome">
      <div className="parentDashboardHome-table">
        {childData === null || childData.length === 0 ? (
          <>
            <p className="employeeDashboardHome-table-nochild">
              Please Add Your Children.
            </p>
          </>
        ) : (
          childData.map((child, idx) => {
            return (
              <>
                {idx === 0 ? (
                  <>
                    <div className="parentDashboardHome-table-header flex">
                      <div className="parentDashboardHome-header-reg">REG</div>
                      <div className="parentDashboardHome-header-name">
                        Child First Name
                      </div>
                      <div className="parentDashboardHome-header-name">
                        Child Last Name
                      </div>
                      <div className="parentDashboardHome-header-Age">Age</div>
                      <div className="parentDashboardHome-header-dob">
                        Parent First Name
                      </div>
                      <div className="parentDashboardHome-header-docs">
                        Parent Last Name
                      </div>
                      <div className="parentDashboardHome-header-docs">
                        Documents
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="parentDashboardHome-table-child flex">
                  <div className="parentDashboardHome-child-reg">{idx + 1}</div>
                  <div className="parentDashboardHome-header-name">
                    {child.FirstName}
                  </div>
                  <div className="parentDashboardHome-header-name">
                    {child.LastName}
                  </div>
                  <div className="parentDashboardHome-header-Age">
                    {child.Age}
                  </div>
                  <div className="parentDashboardHome-header-dob">
                    {child.ParentFirstName}
                  </div>
                  <div className="parentDashboardHome-header-docs">
                    {child.ParentLastName}
                  </div>
                  <div
                    className="parentDashboardHome-child-docs"
                    onClick={() => {
                      setDocumentsModal(true);
                      setChildDocs(child.ChildId);
                    }}
                  >
                    Documents
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
      {documentsModal && (
        <ParentDashboardChildDocs
          setDocumentsModal={setDocumentsModal}
          childDocs={childDocs}
        />
      )}
      {popupStatus === "undefined" ? (
        <></>
      ) : (
        <>
          <ParentDashboardEventPopup
            eventData={eventData}
            setEventData={setEventData}
          />
        </>
      )}
    </section>
  );
};

export default ParentDashboardHome;
