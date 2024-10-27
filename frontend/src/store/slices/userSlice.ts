// frontend/src/store/slices/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// State initialization
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk to fetch all the users
export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error retrieving users."
      );
    }
  }
);

// Thunk to fetch a user by id
export const fetchUsersByIdThunk = createAsyncThunk(
  "users/fetchUsersById",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users?id=${id}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error retrieving user."
      );
    }
  }
);
// Thunk to fetch a user by title
export const fetchUsersByTitleThunk = createAsyncThunk(
  "users/fetchUsersByTitle",
  async (title: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users?title=${title}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error retrieving user."
      );
    }
  }
);

// Thunk to create a user
export const createUserThunk = createAsyncThunk(
  "users/createUsers",
  async (userData: Partial<User>, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error creating user."
      );
    }
  }
);

// Thunk to update a user
export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async ({ id, ...userData }: Partial<User>, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error updating user."
      );
    }
  }
);

// Thunk to delete a user
export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (id: number, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error deleting the user."
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create User
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.users.push(action.payload);
        }
      )
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update User
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          // if the user exists (if the index is different of -1, it means that the user exists)
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete User
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUserThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.users = state.users.filter(
            (user) => user.id !== action.payload
          );
        }
      )
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
