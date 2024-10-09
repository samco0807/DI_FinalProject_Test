// frontend/src/store/slices/eventSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

// Thunk pour récupérer tous les événements
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Erreur lors de la récupération des événements.');
    }
  }
);

// Thunk pour créer un événement
export const createEventThunk = createAsyncThunk(
  'events/createEvent',
  async (eventData: Partial<Event>, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Erreur lors de la création de l\'événement.');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Event
      .addCase(createEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventThunk.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventSlice.reducer;