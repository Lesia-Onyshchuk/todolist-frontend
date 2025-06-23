import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchBoardById = createAsyncThunk(
  "boards/fetchBoardById",
  async (boardId, thunkAPI) => {
    try {
      const { data } = await api.get(`/boards/${boardId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (boardData, thunkAPI) => {
    try {
      const { data } = await api.post("/", boardData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
