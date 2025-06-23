import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async ({ boardId }, thunkAPI) => {
    try {
      const { data } = await api.get(`/boards/:${boardId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
