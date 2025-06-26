import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
// import { RootState } from "../store";

export interface Board {
  _id: string;
  name: string;
}

export interface NewBoard {
  name: string;
}

export const fetchBoardById = createAsyncThunk<
  { data: Board },
  string,
  { rejectValue: string }
>("boards/fetchBoardById", async (boardId, thunkAPI) => {
  try {
    const { data } = await api.get(`/boards/${boardId}`);
    return { data };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addBoard = createAsyncThunk<
  { data: Board },
  NewBoard,
  { rejectValue: string }
>("boards/addBoard", async (boardData, thunkAPI) => {
  try {
    const { data } = await api.post("/", boardData);
    return { data };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteBoard = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("boards/deleteBoard", async (boardId, thunkAPI) => {
  try {
    await api.delete(`/boards/${boardId}`);
    return boardId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
