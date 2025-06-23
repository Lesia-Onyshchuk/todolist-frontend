import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = slice.reducer;
