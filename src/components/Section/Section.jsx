// Section.jsx

import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import './Section.css';

function Section(props) {
  const { date, dateDetail, concept, eventImg, eventTitle, eventLocation, eventDescription, onAddToCalendar } = props;
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  const handleAddToCalendar = () => {
    onAddToCalendar(date);
    setAddedToCalendar(!addedToCalendar);
  };

  return (
    <>
      {props.activeFilter === "all" || concept === props.activeFilter ? (
        <div className="container">
          <div className="event-container">
            <div className="left-side">
              <p className="event-date">{dateDetail}</p>
              <p className="event-concept">{concept}</p>
            </div>
            <div className="right-side">
              <div className="event-img-box">
                <img src={eventImg} alt="" />
              </div>
              <div className="event-info-box">
                <h2 className="event-title">{eventTitle}</h2>
                <div className="location-box">
                  <span className="location-icon"></span>
                  <p className="event-location">{eventLocation}</p>
                </div>
                <p className="event-description">{eventDescription}</p>
              </div>
              <div className="callender-container">
                <button>Buy Ticket</button>
                <div className="add-call-box" onClick={handleAddToCalendar}>
                  <span className="add-icon">{addedToCalendar ? <FaMinusCircle /> : <FaCirclePlus />}</span>
                  <p>{addedToCalendar ? "Added To Calendar" : "Add To Calendar"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Section;