import { createSlice } from "@reduxjs/toolkit";
import { addBoard, deleteBoard, fetchBoardById } from "./operations";

const initialState = {
  items: [],
  board: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "boards",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(fetchBoardById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addBoard.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBoard.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardsReducer = slice.reducer;
