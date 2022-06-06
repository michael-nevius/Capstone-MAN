import React from "react";
import "../css/parentDashboardEventPopup.scss";

const ParentDashboardEventPopup = ({ eventData, setEventData }) => {
  const eventSkip = () => {
    localStorage.setItem("popup", "undefined");
    window.location.pathname = "/p/dashboard/events";
  };
  // console.log("iiiiiiiiiiiiiii", eventData);
  return (
    <>
      {eventData === null ? (
        <></>
      ) : (
        <>
          <section className="parentDashboardEventPopup">
            <div className="parentDashboardEventPopup-wrapper flex flex-aic flex-jcc">
              <div className="parentDashboardEventPopup-modal">
                <div className="parentDashboardEventPopup-modal-new">
                  <p>Upcoming Event !!!</p>
                </div>
                <div>
                  <p className="parentDashboardEventsDiv-item-header">
                    Event: {eventData.EventsName}
                  </p>
                  <p className="parentDashboardEventsDiv-item-date">
                    Date: {eventData.EventDate}
                  </p>
                  <p className="parentDashboardEventsDiv-item-date">
                    Time: {eventData.EventTime}
                  </p>
                  <p className="parentDashboardEventsDiv-item-date">
                    Address: {eventData.EventsAddress}
                  </p>
                  <p className="parentDashboardEventsDiv-item-date">
                    Cost: {eventData.EventsCost}
                  </p>
                  <p className="parentDashboardEventsDiv-item-date">
                    Safety: {eventData.EventsSafety}
                  </p>
                  <div className="flex flex-aic flex-jcc">
                    {eventData.status === 1 ? (
                      <>
                        <p
                          className="parentDashboardEventPopup-modal-reg"
                          style={{
                            backgroundColor: "green",
                            cursor: "default",
                          }}
                        >
                          Registered
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          className="parentDashboardEventPopup-modal-skip"
                          onClick={() => {
                            eventSkip();
                          }}
                        >
                          Skip
                        </p>
                        <p
                          className="parentDashboardEventPopup-modal-reg"
                          onClick={() => {
                            localStorage.setItem("popup", "undefined");
                            window.location.pathname = "/p/dashboard/events";
                          }}
                        >
                          Register
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ParentDashboardEventPopup;
