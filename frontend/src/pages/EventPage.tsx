// frontend/src/pages/EventPage.tsx
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

export const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEvent(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error retrieving event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Downloading event...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Event not found.</p>;

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
