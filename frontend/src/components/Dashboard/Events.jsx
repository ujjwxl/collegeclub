import React, { useState, useEffect } from "react";
import "./Events.css"
const Events = () => {
  const [events, setEvents] = useState([]);
  const [target, setTarget] = useState("");

  useEffect(() => {
    const fetchEventsByTarget = async () => {
      try {
        const storedTarget = localStorage.getItem("type");
        if (!storedTarget) {
          throw new Error("Target type not found in local storage");
        }
        setTarget(storedTarget);

        const response = await fetch(
          `http://localhost:5000/auth/getEvents/${storedTarget}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEventsByTarget();
  }, []);

  return (
    <div className="dashboard-box-events">
      <div className="dashboard-box-container-events">
        <h2>Events</h2>
        <div className="events-list">
          {events.length > 0 ? (
            <div className="event-cards">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-card-content">
                    <h3>{event.message}</h3>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events-msg">No events found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
