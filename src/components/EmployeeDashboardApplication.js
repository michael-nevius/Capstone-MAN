import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { baseURL } from "../utils/api/baseURL";
import "../css/employeeDashboardApplication.scss";

const EmployeeDashboardApplication = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  const [documentsModal, setDocumentsModal] = useState(false);
  const [parentData, setParentData] = useState(null);
  useEffect(() => {
    setNavbarTitle("Parent Applications");
    const callAllParentAPI = () => {
      fetch(baseURL + `getAllParents/`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const { status, parentsData } = res;

          if (status === 200) {
            setParentData(parentsData);
          } else {
            // setChildWorkData(null);
          }
        })
        .catch((error) => {
          // console.log(error);
          console.clear();
        });
    };
    callAllParentAPI();
  }, []);

  const callParentApproveAPI = (parent) => {
    // console.log(parent);
    fetch(baseURL + `approvalUserUpdate/`, {
      method: "PUT",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        ParentId: parent.ParentId,
        FirstName: parent.FirstName,
        LastName: parent.LastName,
        SpouseFirstName: parent.SpouseFirstName,
        SpouseLastName: parent.SpouseLastName,
        Street: parent.Street,
        State: parent.State,
        City: parent.City,
        Zipcode: parent.Zipcode,
        Email: parent.Email,
        PhoneNumber: parent.PhoneNumber,
        Password: parent.Password,
        NumberOfChildren: parent.NumberOfChildren,
        BalanceDue: parent.BalanceDue,
        DateOfJoining: parent.DateOfJoining,
        ApprovalStatus: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          window.location.pathname = "/e/dashboard/application";
        }
      });
  };

  return (
    <section className="employeeDashboardApplication">
      <div className="employeeDashboardApplication-table">
        {parentData === null ? (
          <>
            <p className="employeeDashboardApplication-table-nochild">
              No data Available.
            </p>
          </>
        ) : (
          parentData.map((parent, idx) => {
            return (
              <>
                {idx === 0 ? (
                  <>
                    <div className="employeeDashboardApplication-table-header flex">
                      <div className="employeeDashboardApplication-header-reg">
                        Id
                      </div>
                      <div className="employeeDashboardApplication-header-name">
                        First Name
                      </div>
                      <div className="employeeDashboardApplication-header-name">
                        Last Name
                      </div>
                      <div className="employeeDashboardApplication-header-Age">
                        City
                      </div>
                      <div className="employeeDashboardApplication-header-dob">
                        State
                      </div>
                      <div className="employeeDashboardApplication-header-dob">
                        Zipcode
                      </div>
                      <div className="employeeDashboardApplication-header-docs">
                        PhoneNumber
                      </div>
                      <div className="employeeDashboardApplication-header-docs">
                        Status
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <>
                  <div className="employeeDashboardApplication-table-child flex flex-aic">
                    <div className="employeeDashboardApplication-child-reg">
                      {parent.ParentId}
                    </div>
                    <div className="employeeDashboardApplication-child-name">
                      {parent.FirstName}
                    </div>
                    <div className="employeeDashboardApplication-child-name">
                      {parent.LastName}
                    </div>
                    <div className="employeeDashboardApplication-child-Age">
                      {parent.City}
                    </div>
                    <div className="employeeDashboardApplication-child-dob">
                      {parent.State}
                    </div>
                    <div className="employeeDashboardApplication-child-docs">
                      {parent.Zipcode}
                    </div>
                    <div className="employeeDashboardApplication-child-docs">
                      {parent.PhoneNumber}
                    </div>
                    <div className="employeeDashboardApplication-table-child-docs">
                      <button
                        onClick={() => {
                          callParentApproveAPI(parent);
                        }}
                        disabled={parent.ApprovalStatus ? true : false}
                        className={
                          parent.ApprovalStatus
                            ? "employeeDashboardApplication-table-child-docs-btn not"
                            : "employeeDashboardApplication-table-child-docs-btn"
                        }
                      >
                        {parent.ApprovalStatus ? "Approved" : "Approve"}
                      </button>
                    </div>
                  </div>
                </>
              </>
            );
          })
        )}
      </div>
    </section>
  );
};

export default EmployeeDashboardApplication;
