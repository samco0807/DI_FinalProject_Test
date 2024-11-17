// frontend/src/components/EventList.tsx
import React from "react";
import { EventCard } from "./EventCard";
import { Event } from "../../types/Event";
import { useEffect, useState } from "react";
import axios from "axios";

interface EventListProps {
  events: Event[];
  onViewDetails: (eventId: number) => void;
  onEditEvent: (eventId: number) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onViewDetails,
  onEditEvent,
}) => {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewDetails={onViewDetails}
          onEditEvent={onEditEvent}
        />
      ))}
    </div>
  );
};

export default EventList;
