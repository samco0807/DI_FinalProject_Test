// backend/src/models/Event.ts
export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  organizer_id: number;
  created_at?: Date;
  updated_at?: Date;
}