import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasks/slice";
import { boardsReducer } from "./boards/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist";

import { TasksState } from "./tasks/slice";
import { BoardsState } from "./boards/slice";

// export interface RootState {
//   tasks: TasksState;
//   boards: BoardsState;
// }

const tasksPersistConfig: PersistConfig<TasksState> = {
  key: "tasks",
  storage,
};

const boardsPersistConfig: PersistConfig<BoardsState> = {
  key: "boards",
  storage,
};

export const store = configureStore({
  reducer: {
    tasks: persistReducer<TasksState>(tasksPersistConfig, tasksReducer),
    boards: persistReducer<BoardsState>(boardsPersistConfig, boardsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
