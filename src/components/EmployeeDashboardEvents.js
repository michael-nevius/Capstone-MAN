import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { baseURL } from "../utils/api/baseURL";
import ".././css/employeeDashboardEvents.scss";
import EmployeeDashboardSetEvent from "./EmployeeDashboardSetEvent";
import EmployeeDashboardEventDetails from "./EmployeeDashboardEventDetails";

const EmployeeDashboardEvents = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  // const [documentsModal, setDocumentsModal] = useState(false);
  const [eventAllData, setEventAllData] = useState(null);
  const [registeredEventAllData, setRegisteredEventAllData] = useState(null);
  const [setEventModal, setSetEventModal] = useState(false);
  const [setEventDetailsModal, setSetEventDetailsModal] = useState(false);
  const [eventId, setEventId] = useState(null);
  useEffect(() => {
    setNavbarTitle("Set Event");
    const callAllEventAPI = () => {
      fetch(baseURL + `getAllEvents/`, {
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
            // console.log("onee", eventsData);
            setEventAllData(eventsData);
          }
        });
    };
    const callALLRegisteredEventAPI = () => {
      fetch(baseURL + `getAllEventsRegistered/`, {
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
            setRegisteredEventAllData(eventsData);
          }
        });
    };
    setNavbarTitle("Set Events");
    callAllEventAPI();
    callALLRegisteredEventAPI();
  }, []);
  return (
    <>
      <div className="employeeDashboardEvents-addBtn">
        <p
          className="flex flex-aic"
          onClick={() => {
            setSetEventModal(true);
          }}
        >
          <i className="bx bx-plus"></i>
          Set Event
        </p>
      </div>
      <section className="employeeDashboardEvents">
        <div className="parentDashboardEventsDiv flex">
          {eventAllData === null ? (
            <>nothing</>
          ) : (
            <>
              {eventAllData.map((e, idx) => {
                return (
                  <div className="parentDashboardEventsDiv-item">
                    <p className="parentDashboardEventsDiv-item-header">
                      Event: {e.EventsName}
                    </p>
                    <p className="parentDashboardEventsDiv-item-date">
                      Date: {e.EventDate}
                    </p>
                    <p className="parentDashboardEventsDiv-item-date">
                      Time: {e.EventTime}
                    </p>
                    <p className="parentDashboardEventsDiv-item-date">
                      Address: {e.EventsAddress}
                    </p>
                    <p className="parentDashboardEventsDiv-item-date">
                      Cost: {e.EventsCost}
                    </p>
                    <p className="parentDashboardEventsDiv-item-date">
                      Safety: {e.EventsSafety}
                    </p>
                    <p
                      className="parentDashboardEventsDiv-item-date"
                      style={{
                        textAlign: "center",
                        backgroundColor: "gray",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEventId(e.EventId);
                        setSetEventDetailsModal(true);
                      }}
                    >
                      See Details
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {setEventModal && (
          <EmployeeDashboardSetEvent setSetEventModal={setSetEventModal} />
        )}
        {setEventDetailsModal && (
          <EmployeeDashboardEventDetails
            setSetEventDetailsModal={setSetEventDetailsModal}
            eventId={eventId}
          />
        )}
      </section>
    </>
  );
};

export default EmployeeDashboardEvents;
