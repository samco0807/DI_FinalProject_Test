// backend/src/controllers/eventController.ts
import { NextFunction, Request, Response } from "express";
import {
  _createEvent,
  _getAllEvents,
  _getEventById,
  _updateEvent,
  _deleteEvent,
} from "../models/eventModel";
import { Event } from "../models/Event";
import { ok } from "assert";

// POST /api/events
export const createEvent = async (req: Request, res: Response) => {
  const { title, description, category, location, date, time } = req.body;
  const organizer_id = req.user?.id;
  // 1. we check if the organizer id exist so that the user can create the event
  if (!organizer_id) {
    return res.status(401).json({ message: "Unauthorized. No organizer ID" });
  }
  // 2. We check if every field is filled
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

    const createdEvent = await _createEvent(newEvent);

    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating event." });
  }
};

// GET /api/events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await _getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching events." });
  }
};

// GET /api/events/:id
export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const eventId = parseInt(id, 10);

  // Validate the input
  if (isNaN(eventId)) {
    return res
      .status(400)
      .json({ message: "Invalid event ID. Must be a number." });
  }

  try {
    const event = await _getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// PUT /api/events/:id
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventId = parseInt(id, 10);
  const { title, description, category, location, date, time } = req.body;
  const organizer_id = req.user?.id;

  // Validate the input
  if (isNaN(eventId)) {
    return res
      .status(400)
      .json({ message: "Invalid event ID. Must be a number." });
  }

  try {
    const event = await _getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    if (event.organizer_id !== organizer_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this event." });
    }
    const updatedEvent = await _updateEvent(eventId, {
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
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organizer_id = req.user?.id;
  try {
    // 1. We check if the event exists with the id
    const event = await _getEventById(Number(id));
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    // 2. we check if the user is an organizer with the organizer id
    if (event.organizer_id !== organizer_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this event." });
    }
    // 3. if the event exists and the user is an organizer, the event is deleted
    await _deleteEvent(Number(id));

    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting event." });
  }
};

// GET test
export const test = async (req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
};