import React, { useEffect, useState } from "react";
import "../css/employeeDashboardEventDetails.scss";
import { baseURL } from "../utils/api/baseURL";
const EmployeeDashboardEventDetails = ({
  setSetEventDetailsModal,
  eventId,
}) => {
  const [eventData, setEventData] = useState(null);
  useEffect(() => {
    const callEventDetaisAPI = () => {
      fetch(baseURL + `getEventByRegisteredEvent/${eventId}`, {
        method: "GET",
        headers: new Headers({
          accept: "application/json",
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const { status, eventsData } = res;
          if (status === 200) {
            // console.log("two", eventsData);
            setEventData(eventsData);
          }
        });
    };
    callEventDetaisAPI();
  }, []);

  return (
    <section className="employeeDashboardEventDetails">
      <div className="employeeDashboardEventDetails-wrapper flex flex-aci flex-jcc">
        <div className="employeeDashboardEventDetails-modal">
          <div className="employeeDashboardEventDetails-close">
            <i
              class="bx bx-x"
              onClick={() => {
                setSetEventDetailsModal(false);
              }}
            ></i>
          </div>
          <div className="employeeDashboardEventDetails-table">
            {eventData === null ? (
              <>
                <p className="employeeDashboardEventDetails-table-nochild">
                  No data Available.
                </p>
              </>
            ) : (
              eventData.map((parent, idx) => {
                return (
                  <>
                    {idx === 0 ? (
                      <>
                        <div className="employeeDashboardEventDetails-table-header flex">
                          <div className="employeeDashboardEventDetails-header-reg">
                            Parent Id
                          </div>
                          <div className="employeeDashboardEventDetails-header-reg">
                            Registration Date
                          </div>
                          <div className="employeeDashboardEventDetails-header-name">
                            Parent First Name
                          </div>
                          <div className="employeeDashboardEventDetails-header-name">
                            Parent Last Name
                          </div>
                          <div className="employeeDashboardEventDetails-header-Age">
                            Spouse First Name
                          </div>
                          <div className="employeeDashboardEventDetails-header-dob">
                            Spouse Last Name
                          </div>
                          <div className="employeeDashboardEventDetails-header-docs">
                            City
                          </div>
                          <div className="employeeDashboardEventDetails-header-docs">
                            State
                          </div>
                          <div className="employeeDashboardEventDetails-header-docs">
                            Zipcode
                          </div>
                          <div className="employeeDashboardEventDetails-header-docs">
                            Email
                          </div>
                          <div className="employeeDashboardEventDetails-header-docs">
                            Phone Number
                          </div>
                          <div className="employeeDashboardEventDetails-header-docs">
                            Number of member
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="employeeDashboardEventDetails-table-child flex">
                      <div className="employeeDashboardEventDetails-child-reg">
                        {parent.ParentId}
                      </div>
                      <div className="employeeDashboardEventDetails-header-name">
                        {parent.parentsData.FirstName}
                      </div>
                      <div className="employeeDashboardEventDetails-header-name">
                        {parent.parentsData.LastName}
                      </div>
                      <div className="employeeDashboardEventDetails-header-Age">
                        {parent.parentsData.SpouseFirstName}
                      </div>
                      <div className="employeeDashboardEventDetails-header-dob">
                        {parent.parentsData.SpouseLastName}
                      </div>
                      <div className="employeeDashboardEventDetails-header-docs">
                        {parent.parentsData.City}
                      </div>
                      <div className="employeeDashboardEventDetails-child-docs">
                        {parent.parentsData.State}
                      </div>
                      <div className="employeeDashboardEventDetails-child-docs">
                        {parent.parentsData.Zipcode}
                      </div>
                      <div className="employeeDashboardEventDetails-child-docs">
                        {parent.parentsData.Email}
                      </div>
                      <div className="employeeDashboardEventDetails-child-docs">
                        {parent.parentsData.PhoneNumber}
                      </div>
                      <div className="employeeDashboardEventDetails-child-docs">
                        {parent.ParentsCountComing}
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDashboardEventDetails;
