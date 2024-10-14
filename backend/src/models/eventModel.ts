// backend/src/models/eventModel.ts
import db from "../db/knex";
import { Event } from "../models/Event.ts";

export const createEvent = async (event: Partial<Event>): Promise<Event> => {
  const [newEvent] = await db<Event>("events").insert(event).returning("*");
  return newEvent;
};

export const getAllEvents = async (): Promise<Event[]> => {
  return db<Event>("events").select("*");
};

export const getEventById = async (id: number): Promise<Event | undefined> => {
  return db<Event>("events").where({ id }).first();
};

export const updateEvent = async (
  id: number,
  event: Partial<Event>
): Promise<Event> => {
  const [updatedEvent] = await db<Event>("events")
    .where({ id })
    .update(event)
    .returning("*");
  return updatedEvent;
};

export const deleteEvent = async (id: number): Promise<void> => {
  await db<Event>("events").where({ id }).del();
};
