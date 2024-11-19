// backend/src/models/eventModel.ts
import { db } from "../db/knex";
import { Event } from "../models/Event";

export const _createEvent = async (event: Partial<Event>): Promise<Event> => {
  try {
    console.log("Creating event wwith data", event);
    const [newEvent] = await db<Event>("events").insert(event).returning("*");
    console.log("Event created successfully", newEvent);
    return newEvent;
  } catch (error) {
    console.error("Error creating event in the data base", error);
    throw error
  }
};

export const _getAllEvents = async (): Promise<Event[]> => {
  return db<Event>("events").select("*");
};

export const _getEventById = async (id: number): Promise<Event | undefined> => {
  return db<Event>("events").where({ id }).first();
};

export const _updateEvent = async (
  id: number,
  event: Partial<Event>
): Promise<Event> => {
  const [updatedEvent] = await db<Event>("events")
    .where({ id })
    .update(event)
    .returning("*");
  return updatedEvent;
};

export const _deleteEvent = async (id: number): Promise<void> => {
  await db<Event>("events").where({ id }).del();
};
