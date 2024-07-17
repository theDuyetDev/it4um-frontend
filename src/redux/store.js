import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import rootReducer from "./reducers";

// Định nghĩa persistConfig
const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["store"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo Redux store
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
