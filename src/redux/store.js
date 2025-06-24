import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasks/slice.js";
import { boardsReducer } from "./boards/slice.js";

// export const store = configureStore({
//   reducer: {
//     tasks: tasksReducer,
//     boards: boardsReducer,
//   },
// });

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

const tasksPersistConfig = {
  key: "tasks",
  storage,
};

const boardsPersistConfig = {
  key: "boards",
  storage,
};

export const store = configureStore({
  reducer: {
    tasks: persistReducer(tasksPersistConfig, tasksReducer),
    boards: persistReducer(boardsPersistConfig, boardsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
