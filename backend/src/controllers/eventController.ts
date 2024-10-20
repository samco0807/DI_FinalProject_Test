// backend/src/controllers/eventController.ts
import { Request, Response } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../models/eventModel";
import { Event } from "../models/Event";

// POST /api/events
export const createEventHandler = async (req: Request, res: Response) => {
  const { title, description, category, location, date, time } = req.body;
  const organizer_id = req.user?.id;

  if (!title || !description || !category || !location || !date || !time) {
    return res.status(400).json({ message: "All event fields are required." });
  }

  try {
    const newEvent: Partial<Event> = {
      title,
      description,
      category,
      location,
      date,
      time,
      organizer_id,
    };

    const createdEvent = await createEvent(newEvent);

    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating event." });
  }
};

// GET /api/events
export const getAllEventsHandler = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching events." });
  }
};

// GET /api/events/:id
export const getEventByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await getEventById(Number(id));
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching event." });
  }
};

// PUT /api/events/:id
export const updateEventHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, location, date, time } = req.body;
  const organizer_id = req.user?.id;

  try {
    const event = await getEventById(Number(id));
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.organizer_id !== organizer_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this event." });
    }

    const updatedEvent = await updateEvent(Number(id), {
      title,
      description,
      category,
      location,
      date,
      time,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating event." });
  }
};

// DELETE /api/events/:id
export const deleteEventHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organizer_id = req.user?.id;

  try {
    const event = await getEventById(Number(id));
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.organizer_id !== organizer_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this event." });
    }

    await deleteEvent(Number(id));

    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting event." });
  }
};