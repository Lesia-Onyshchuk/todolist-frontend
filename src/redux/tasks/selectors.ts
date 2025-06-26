import { RootState } from "../store";
import { Task } from "./slice";

export const selectTasks = (state: RootState): Task[] =>
  state.tasks.items || [];

export const selectTaskLoading = (state: RootState): boolean =>
  state.tasks.loading;

export const selectError = (state: RootState): string | null =>
  state.tasks.error;
