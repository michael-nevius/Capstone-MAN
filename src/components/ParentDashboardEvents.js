import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../css/parentDashboardEvents.scss";
import { baseURL } from "../utils/api/baseURL";
const ParentDashboardEvents = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  const [eventAllData, setEventAllData] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  useEffect(() => {
    const callAllEventAPI = () => {
      fetch(
        baseURL + `getEventByParentId/${outletData.userID.userData.ParentId}`,
        {
          method: "GET",
          headers: new Headers({
            accept: "application/json",
            "Content-Type": "application/json",
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          const { status, eventsData } = res;
          if (status === 200) {
            // console.log(eventsData);
            setEventAllData(eventsData);
          }
        });
    };
    setNavbarTitle("Events");
    callAllEventAPI();
  }, []);

  const callRegisterEventAPI = (eventData) => {
    if (memberCount !== 0) {
      fetch(baseURL + `eventRegisteration/`, {
        method: "POST",
        headers: new Headers({
          accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          ParentId: outletData.userID.userData.ParentId,
          EventId: eventData.EventId,
          ParentsCountComing: memberCount,
          RegisterationDate: date,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const { status } = res;
          if (status === 200) {
            window.location.pathname = "/p/dashboard/events";
          }
        });
    }
  };

  return (
    <section className="parentDashboardEvents">
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
                    className={
                      e.status === 0
                        ? "parentDashboardEventsDiv-item-status not"
                        : "parentDashboardEventsDiv-item-status"
                    }
                  >
                    {e.status === 0 ? "Not Registered" : "Registered"}
                  </p>
                  {e.status === 0 ? (
                    <>
                      <div className="flex flex-jcc flex-aic">
                        <input
                          type="number"
                          placeholder="Number of Member"
                          style={{
                            padding: "10px",
                            width: "170px",
                            marginRight: "15px",
                            border: "2px solid steelblue",
                            outline: "none",
                          }}
                          onChange={(e) => {
                            setMemberCount(e.target.value);
                          }}
                        ></input>
                        <p
                          className="parentDashboardEventsDiv-item-reg"
                          onClick={() => {
                            callRegisterEventAPI(e);
                          }}
                        >
                          Register Now!
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default ParentDashboardEvents;
