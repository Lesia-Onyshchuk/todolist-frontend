import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async ({ boardId }, thunkAPI) => {
    try {
      const { data } = await api.get(`/boards/${boardId}/tasks`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, thunkAPI) => {
    try {
      const { boardId, ...rest } = taskData;
      const { data } = await api.post(`/boards/${boardId}/tasks`, rest);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ boardId, id, updates }, thunkAPI) => {
    try {
      const { data } = await api.patch(
        `/boards/${boardId}/tasks/${id}`,
        updates
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ boardId, id }, thunkAPI) => {
    try {
      await api.delete(`/boards/${boardId}/tasks/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
