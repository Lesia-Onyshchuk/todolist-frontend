import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addBoard, deleteBoard, fetchBoardById } from "./operations";

export interface Board {
  _id: string;
  name: string;
  boardId: number;
}

export interface BoardsState {
  items: Board[];
  board: Board | null;
  current?: Board;
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  items: [],
  board: null,
  loading: false,
  error: null,
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
      .addCase(
        fetchBoardById.fulfilled,
        (state, action: PayloadAction<{ data: Board }>) => {
          state.loading = false;
          state.board = action.payload.data;
        }
      )
      .addCase(fetchBoardById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addBoard.fulfilled,
        (state, action: PayloadAction<{ data: Board }>) => {
          state.loading = false;
          const newBoard = action.payload.data;
          state.items.push(newBoard);
          state.current = newBoard;
        }
      )
      .addCase(addBoard.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteBoard.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.items = state.items.filter(
            (item) => item._id !== action.payload
          );
        }
      )
      .addCase(deleteBoard.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardsReducer = slice.reducer;
