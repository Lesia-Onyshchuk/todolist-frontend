import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { Task } from "./slice";

interface FetchTasksArgs {
  boardId: string;
}

interface AddTaskArgs {
  boardId: string;
  title: string;
  description?: string;
  status: string;
}

interface UpdateTaskArgs {
  boardId: string;
  id: string;
  updates: Partial<Omit<AddTaskArgs, "boardId">>;
}

interface DeleteTaskArgs {
  boardId: string;
  id: string;
}

export const fetchTasks = createAsyncThunk<
  Task[],
  FetchTasksArgs,
  { rejectValue: string }
>("tasks/fetchAll", async ({ boardId }, thunkAPI) => {
  try {
    const { data } = await api.get(`/boards/${boardId}/tasks`);
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTask = createAsyncThunk<
  Task,
  AddTaskArgs,
  { rejectValue: string }
>("tasks/addTask", async (taskData, thunkAPI) => {
  try {
    const { boardId, ...rest } = taskData;
    const { data } = await api.post(`/boards/${boardId}/tasks`, rest);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateTask = createAsyncThunk<
  Task,
  UpdateTaskArgs,
  { rejectValue: string }
>("tasks/updateTask", async ({ boardId, id, updates }, thunkAPI) => {
  try {
    const { data } = await api.patch(`/boards/${boardId}/tasks/${id}`, updates);
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk<
  string,
  DeleteTaskArgs,
  { rejectValue: string }
>("tasks/deleteTask", async ({ boardId, id }, thunkAPI) => {
  try {
    await api.delete(`/boards/${boardId}/tasks/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
