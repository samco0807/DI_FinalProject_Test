// frontend/src/components/EventCard.tsx
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { deleteEventThunk } from "../../store/slices/eventSlice";
import { Event } from "../../types/Event"; // Type de données de l'événement, à ajuster selon votre projet
import "./EventCard.css";

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: number) => void;
  onEditEvent: (eventId: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onEditEvent,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteEventThunk(event.id));
  };

  return (
    <div className="event-card">
      <h2 className="event-card__title">{event.title}</h2>
      <p className="event-card__description">{event.description}</p>
      <p className="event-card__details">
        <span>{new Date(event.date).toLocaleDateString()}</span> |{" "}
        <span>{event.location}</span>
      </p>
      <div className="event-card__actions">
        <button
          onClick={() => onViewDetails(event.id)}
          className="event-card__button"
        >
          View Details
        </button>
        <button
          onClick={() => onEditEvent(event.id)}
          className="event-card__button"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="event-card__button event-card__button--delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
