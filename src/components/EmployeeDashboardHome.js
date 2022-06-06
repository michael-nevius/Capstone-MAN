import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import EmployeeDashboardChildDocs from "./EmployeeDashboardChildDocs";
import "../css/employeeDashboardHome.scss";
import { baseURL } from "../utils/api/baseURL";

const EmployeeDashboardHome = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle, userID } = outletData;
  const [documentsModal, setDocumentsModal] = useState(false);
  const [childData, setChildData] = useState(null);
  // const [eventData, setEventData] = useState(userID.eventsData);
  const [childDocs, setChildDocs] = useState(null);
  // // console.log(eventData);
  useEffect(() => {
    setNavbarTitle("Dashboard");
    const callChildDataAPI = () => {
      fetch(baseURL + `getAllChildren`, {
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
    <section className="employeeDashboardHome">
      <div className="employeeDashboardHome-table">
        {childData === null ? (
          <>
            <p className="employeeDashboardHome-table-nochild">
              No data Available.
            </p>
          </>
        ) : (
          childData.map((child, idx) => {
            return (
              <>
                {idx === 0 ? (
                  <>
                    <div className="employeeDashboardHome-table-header flex">
                      <div className="employeeDashboardHome-header-reg">
                        REG
                      </div>
                      <div className="employeeDashboardHome-header-name">
                        Child First Name
                      </div>
                      <div className="employeeDashboardHome-header-name">
                        Child Last Name
                      </div>
                      <div className="employeeDashboardHome-header-Age">
                        Age
                      </div>
                      <div className="employeeDashboardHome-header-dob">
                        Parent First Name
                      </div>
                      <div className="employeeDashboardHome-header-docs">
                        Parent Last Name
                      </div>
                      <div className="employeeDashboardHome-header-docs">
                        Add Doc
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="employeeDashboardHome-table-child flex">
                  <div className="employeeDashboardHome-child-reg">
                    {idx + 1}
                  </div>
                  <div className="employeeDashboardHome-header-name">
                    {child.FirstName}
                  </div>
                  <div className="employeeDashboardHome-header-name">
                    {child.LastName}
                  </div>
                  <div className="employeeDashboardHome-header-Age">
                    {child.Age}
                  </div>
                  <div className="employeeDashboardHome-header-dob">
                    {child.ParentFirstName}
                  </div>
                  <div className="employeeDashboardHome-header-docs">
                    {child.ParentLastName}
                  </div>
                  <div
                    className="employeeDashboardHome-child-docs"
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
        <EmployeeDashboardChildDocs
          setDocumentsModal={setDocumentsModal}
          childId={childDocs}
        />
      )}
    </section>
  );
};

export default EmployeeDashboardHome;
