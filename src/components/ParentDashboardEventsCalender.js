import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import moment from 'moment';

import "../css/parentDashboardEvents.scss";
import { baseURL } from "../utils/api/baseURL";
const ParentDashboardEventsCalender = () => {
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
            setEventAllData(eventsData);
          }
        });
    };
    setNavbarTitle("Events Calendar");
    callAllEventAPI();
    
  }, []);
  
  const getEvents = eventAllData !==null && eventAllData.map((item, index) => {
        return({
          start:moment(item.EventDate).format('YYYY-MM-DD'),
          title:item.EventsName,
          allDay:true
        })
  }); 

  return (
    <FullCalendar
        plugins={[ dayGridPlugin ]}
        events={getEvents}
    />
  );
};

export default ParentDashboardEventsCalender;
