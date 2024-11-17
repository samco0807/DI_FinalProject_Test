// frontend/src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEventsThunk } from '../store/slices/eventSlice';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventsThunk());
  }, [dispatch]);

  return (
    <div className="home-container">
      <h1>Welcome on BenevolCentral</h1>
      <p>Find and participate in volunteer activities near you.</p>

      <h2>Available events</h2>
      {loading && <p>Downloading events...</p>}
      {error && <p className="error">{error}</p>}
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              <strong>Category :</strong> {event.category}
            </p>
            <p>
              <strong>Location :</strong> {event.location}
            </p>
            <p>
              <strong>Date :</strong> {event.date} à {event.time}
            </p>
            <Link to={`/events/${event.id}`}>See details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};