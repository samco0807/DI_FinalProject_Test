// frontend/src/pages/FetchEventsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  organizer_id: number;
  created_at: string;
  updated_at: string;
}

export const DisplayEventsPage: React.FC = () => {
  const { id } = useParams();
  const [events, setEvents] = useState<Event[]>([]);
  // const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response;
        if (id) {
          const response = await axios.get(`${API_URL}/events/${id}`);
          setEvents([response.data]);
        } else {
          response = await axios.get(`${API_URL}/events`);
          setEvents(response.data);
        }
      } catch (err: any) {
        // console.log("object");
        setError(err.response?.data?.message || "Error retrieving event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Downloading event...</p>;
  if (error) return <p className="error">{error}</p>;
  if (events.length === 0) return <p>Event not found.</p>;

  return (
    <div className="event-page-container">
      {events.map((event) => (
        <div key={event.id} className="event">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>
            <strong>Category :</strong> {event.category}
          </p>
          <p>
            <strong>Location :</strong> {event.location}
          </p>
          <p>
            <strong>Date :</strong> {event.date} at {event.time}
          </p>
          /* Ajoutez des fonctionnalités supplémentaires comme l'inscription à
          l'événement */
        </div>
      ))}
    </div>
  );
};
