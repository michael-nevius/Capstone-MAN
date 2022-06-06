import React, { useState } from "react";
import "../css/employeeDashboardSetEvent.scss";
import { baseURL } from "../utils/api/baseURL";

const EmployeeDashboardSetEvent = ({ setSetEventModal }) => {
  const [eventFormData, setEventFormData] = useState({});
  const callAddEventAPI = () => {
    fetch(baseURL + `addEvent/`, {
      method: "POST",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        EventDate: eventFormData.date,
        EventsName: eventFormData.name,
        EventTime: eventFormData.time,
        EventsAddress: eventFormData.address,
        EventsCost: eventFormData.cost,
        EventsSafety: eventFormData.safety,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setSetEventModal(false);
          window.location.pathname = "/e/dashboard/events";
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, date, time, address, cost, safety } = eventFormData;
    if (name && date && time && address && cost && safety) {
      // console.log("called....");
      callAddEventAPI();
    }
  };
  return (
    <section className="employeeDashboardSetEvent">
      <div className="employeeDashboardSetEvent-wrapper flex flex-aic flex-jcc">
        <div className="employeeDashboardSetEvent-modal">
          <div className="employeeDashboardSetEvent-modal-close">
            <i
              class="bx bx-x"
              onClick={() => {
                setSetEventModal(false);
              }}
            ></i>
          </div>
          <form>
            <label>Event Name</label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setEventFormData({
                  ...eventFormData,
                  name: e.target.value,
                });
              }}
            ></input>
            {/* <p>{addChildFormErrors.firstName}</p> */}
            <label>Event Date</label>
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              onChange={(e) => {
                setEventFormData({
                  ...eventFormData,
                  date: e.target.value,
                });
              }}
            ></input>
            {/* <p>{addChildFormErrors.lastName}</p> */}
            <label>Event Time</label>
            <input
              type="text"
              placeholder="HH:MM:SS"
              onChange={(e) => {
                setEventFormData({
                  ...eventFormData,
                  time: e.target.value,
                });
              }}
            ></input>
            {/* <p>{addChildFormErrors.age}</p> */}
            <label>Event Address</label>
            <input
              type="text"
              placeholder="Address"
              onChange={(e) => {
                setEventFormData({
                  ...eventFormData,
                  address: e.target.value,
                });
              }}
            ></input>
            {/* <p>{addChildFormErrors.parentFirstName}</p> */}
            <label>Event Cost</label>
            <input
              type="text"
              placeholder="Cost"
              onChange={(e) => {
                setEventFormData({
                  ...eventFormData,
                  cost: e.target.value,
                });
              }}
            ></input>
            {/* <p>{addChildFormErrors.parentLastName}</p> */}
            <label>Saftey Measure</label>
            <input
              type="text"
              placeholder="Safety"
              onChange={(e) => {
                setEventFormData({
                  ...eventFormData,
                  safety: e.target.value,
                });
              }}
            ></input>
            {/* <p>{addChildFormErrors.parentLastName}</p> */}
            <button
              className="parentDashboardAddChild-create-accountBtn"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDashboardSetEvent;
