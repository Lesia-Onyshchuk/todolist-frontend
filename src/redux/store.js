import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasks/slice.js";
import { boardsReducer } from "./boards/slice.js";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    boards: boardsReducer,
  },
});
