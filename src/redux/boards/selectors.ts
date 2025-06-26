import { RootState } from "../store";
import { Board } from "./slice";

export const selectCurrentBoard = (state: RootState): Board | null =>
  state.boards.board;

export const selectBoardLoading = (state: RootState) => state.boards.loading;

export const selectError = (state: RootState): string | null =>
  state.boards.error;
