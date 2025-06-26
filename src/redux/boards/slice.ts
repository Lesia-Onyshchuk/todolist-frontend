import { createSlice } from "@reduxjs/toolkit";
import { fetchBoardById, addBoard, deleteBoard } from "./operations";

export interface Board {
  _id: string;
  name: string;
  boardId: number;
}

export interface BoardItem {
  data: Board;
}

export interface BoardsState {
  loading: boolean;
  error: string | null;
  items: BoardItem[];
  board: Board | null;
  current: Board | null;
}

const initialState: BoardsState = {
  loading: false,
  error: null,
  items: [],
  board: null,
  current: null,
};

const slice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload.data;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(addBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        const newBoard = action.payload.data;
        state.items.push({ data: newBoard });
        state.current = newBoard;
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.data._id !== action.payload
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const boardsReducer = slice.reducer;
