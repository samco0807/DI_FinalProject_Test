// frontend/src/store/slices/eventSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Typescript
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

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

// State initialization
const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

// Thunk to fetch all the events
export const fetchEventsThunk = createAsyncThunk(
  "events/fetchEvents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/events`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error retrieving events."
      );
    }
  }
);

// Thunk to fetch an event by title
export const fetchEventsByTitleThunk = createAsyncThunk(
  "events/fetchEventsByTitle",
  async (title: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/events?title=${title}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error retrieving event."
      );
    }
  }
);

// Thunk to create an event
export const createEventThunk = createAsyncThunk(
  "events/createEvent",
  async (eventData: Partial<Event>, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/events`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error creating event."
      );
    }
  }
);

// Thunk to update an event
export const updateEventThunk = createAsyncThunk(
  "events/updateEvent",
  async ({ id, ...eventData }: Partial<Event>, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/events/${id}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error updating event."
      );
    }
  }
);

// Thunk to delete an event
export const deleteEventThunk = createAsyncThunk(
  "events/deleteEvent",
  async (id: number, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error deleting the event."
      );
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEventsThunk.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.loading = false;
          state.events = action.payload;
        }
      )
      .addCase(fetchEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Event
      .addCase(createEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEventThunk.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.loading = false;
          state.events.push(action.payload);
        }
      )
      .addCase(createEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Event
      .addCase(updateEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEventThunk.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.loading = false;
          const index = state.events.findIndex(
            (event) => event.id === action.payload.id
          );
          // if the event exists (if the index is different of -1, it means that the event exists)
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        }
      )
      .addCase(updateEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Event
      .addCase(deleteEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEventThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          );
        }
      )
      .addCase(deleteEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventSlice.reducer;
