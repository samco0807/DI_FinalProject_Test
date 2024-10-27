// frontend/src/pages/EventPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/${id}`);
        setEvent(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors de la récupération de l\'événement.');
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
      {/* Ajoutez des fonctionnalités supplémentaires comme l'inscription à l'événement */}
    </div>
  );
};

export default EventPage;