import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk for fetching GitHub users
export const getalldata = createAsyncThunk(
  "gitUser/getalldata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.github.com/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing GitHub user state
export const gitUserSlice = createSlice({
  name: "gitUser",
  initialState: {
    user: [],    
    loading: false,
    error: null,    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getalldata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getalldata.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getalldata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gitUserSlice.reducer;
