import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { API_URL_EVENT } from "../config";

import axios from "axios";

// Creation event form
export const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(`${API_URL}/events`, {
        title,
        description,
        category,
        location,
        date,
        time,
      });
      alert("Event created successfully!");
    } catch (err: any) {
      console.error("Error creating event:", err);
      setError(err.response?.data?.message || "Error creating event.");
    }
  };

  return (
<>
    <h2>Creating event form</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Create Event</button>
    </form>
    </>
  );
};
